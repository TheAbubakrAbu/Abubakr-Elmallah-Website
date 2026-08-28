// ocr.swift: read the text out of the photographs, so the site can be checked
// against what the pictures actually say rather than against memory.
//
//     swiftc -O tools/ocr.swift -o tools/ocr        (once)
//     tools/ocr <image> [<image> ...]               -> one JSON object per line
//
// WHY SWIFT AND NOT PYTHON. This wants Apple's Vision framework, which is the
// same recogniser Preview and Spotlight use and is already on the machine. The
// Python route is pyobjc, and pyobjc-core will not build against the
// Xcode-bundled Python 3.9 here (it fails at the wheel). Swift reaches Vision
// with no install at all, which is a better trade for one tool: nothing is
// added to the machine and nothing can rot.
//
// Output is one line of JSON per image, so a long run can be piped straight
// into a file and read back incrementally:
//
//     {"file":"...","lines":["THE SIMPSONS RIDE","..."],"n":2}
//
// `accurate` rather than `fast`: park signage is stylised, often at an angle
// and often small in frame, and the fast path drops most of it. It costs a few
// hundred milliseconds an image and this is run once over a library, not per
// request.

import Foundation
import Vision
import AppKit

func text(of path: String) -> [String] {
    guard let image = NSImage(contentsOfFile: path),
          let cg = image.cgImage(forProposedRect: nil, context: nil, hints: nil)
    else { return [] }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = true
    // Japanese matters here: a good part of this library is signage in Tokyo
    // and Osaka, and leaving it off makes those frames come back empty.
    request.recognitionLanguages = ["en-US", "ja-JP", "es-ES", "fr-FR"]

    let handler = VNImageRequestHandler(cgImage: cg, options: [:])
    do { try handler.perform([request]) } catch { return [] }

    guard let results = request.results else { return [] }
    return results.compactMap { $0.topCandidates(1).first?.string }
        .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
        .filter { !$0.isEmpty }
}

func jsonEscape(_ s: String) -> String {
    var out = ""
    for ch in s.unicodeScalars {
        switch ch {
        case "\"": out += "\\\""
        case "\\": out += "\\\\"
        case "\n", "\r", "\t": out += " "
        default:
            if ch.value < 0x20 { out += " " } else { out.unicodeScalars.append(ch) }
        }
    }
    return out
}

let files = Array(CommandLine.arguments.dropFirst())
for f in files {
    let lines = text(of: f)
    let body = lines.map { "\"\(jsonEscape($0))\"" }.joined(separator: ",")
    print("{\"file\":\"\(jsonEscape(f))\",\"n\":\(lines.count),\"lines\":[\(body)]}")
    fflush(stdout)
}
