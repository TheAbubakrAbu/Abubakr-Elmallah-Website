/* transcript-data.js: the high-school record on /high-school/.

   Straight off the official Trabuco Hills transcript dated 10 June 2024, plus
   the College Board and IB score reports. Marks and course titles are as they
   appear there; the abbreviated titles are expanded for readability and the
   original is kept in `code` so it can still be matched against the document.

   Tags follow the transcript's own key: + honours (weighted), p college prep,
   * non-academic. */
window.TRANSCRIPT = {
  school: 'Trabuco Hills High School',
  place: 'Mission Viejo, California',
  graduated: '30 May 2024',
  stats: [
    { k: 'Weighted GPA', v: '5.1336' },
    { k: 'Unweighted GPA', v: '3.9836' },
    { k: 'UC GPA', v: '4.28' },
    { k: 'CSU GPA', v: '4.15' },
    { k: 'Decile rank', v: '1st', s: 'of a class of 640' },
    { k: 'Credits', v: '330', s: 'attempted and completed' },
  ],

  terms: [
    { term: 'Grade 8', years: '2019–20', where: 'Rancho Santa Margarita Intermediate',
      note: 'Taken early. Only grades 9–12 count toward high-school graduation.',
      rows: [ { code: '4110', name: 'Algebra 1 Accelerated', mark: 'A+', tag: 'p', span: 'All three trimesters' } ] },

    { term: 'Grade 9 · Fall', years: '2020–21', gpa: '4.80', rows: [
      { code: '0204', name: 'English 1 Honors / IB', mark: 'A', tag: '+p' },
      { code: '0432', name: 'Geometry Honors / IB', mark: 'A', tag: '+p' },
      { code: '0737', name: 'AP Human Geography', mark: 'A', tag: '+p' },
      { code: '2404', name: 'Biology: Living Earth Honors', mark: 'A', tag: '+p' },
      { code: '0879', name: 'Study of TV & Film', mark: 'A+', tag: 'p' },
      { code: '0509', name: 'Physical Education 1', mark: 'A+', tag: '*' },
    ] },

    { term: 'Grade 9 · Spring', years: '2020–21', gpa: '4.80', rows: [
      { code: '0204', name: 'English 1 Honors / IB', mark: 'A', tag: '+p' },
      { code: '0432', name: 'Geometry Honors / IB', mark: 'A+', tag: '+p' },
      { code: '0737', name: 'AP Human Geography', mark: 'A', tag: '+p' },
      { code: '2404', name: 'Biology: Living Earth Honors', mark: 'A+', tag: '+p' },
      { code: '0879', name: 'Study of TV & Film', mark: 'A+', tag: 'p' },
      { code: '0570', name: 'Boys Varsity Tennis', mark: 'A+', tag: '*' },
    ] },

    { term: 'Grade 10 · Fall', years: '2021–22', gpa: '5.00', rows: [
      { code: '0206', name: 'English 2 Honors / IB', mark: 'A', tag: '+p' },
      { code: '0418', name: 'Algebra 2 Honors / IB', mark: 'A+', tag: '+p' },
      { code: '0462', name: 'AP Computer Science Principles', mark: 'A', tag: '+p' },
      { code: '0796', name: 'AP European History', mark: 'A+', tag: '+p' },
      { code: '2424', name: 'Chemistry of the Earth Honors', mark: 'A', tag: '+p' },
      { code: '0513', name: 'Athletics', mark: 'A+', tag: '*' },
    ] },

    { term: 'Grade 10 · Spring', years: '2021–22', gpa: '5.00', rows: [
      { code: '0206', name: 'English 2 Honors / IB', mark: 'A+', tag: '+p' },
      { code: '0418', name: 'Algebra 2 Honors / IB', mark: 'A+', tag: '+p' },
      { code: '0462', name: 'AP Computer Science Principles', mark: 'A', tag: '+p' },
      { code: '0796', name: 'AP European History', mark: 'A+', tag: '+p' },
      { code: '2424', name: 'Chemistry of the Earth Honors', mark: 'A', tag: '+p' },
      { code: '0570', name: 'Boys Varsity Tennis', mark: 'A', tag: '*' },
    ] },

    { term: 'Grade 11 · Fall', years: '2022–23', gpa: '5.40', rows: [
      { code: '0265', name: 'English 3 HL 1', mark: 'A', tag: '+p' },
      { code: '0416', name: 'AP Statistics', mark: 'A', tag: '+p' },
      { code: '0439', name: 'AP Computer Science A', mark: 'A', tag: '+p' },
      { code: '0764', name: 'AP United States History', mark: 'A', tag: '+p' },
      { code: '0839', name: 'AP Psychology', mark: 'A', tag: '+p' },
      { code: '1011', name: 'Physics of the Universe Honors', mark: 'A', tag: '+p' },
      { code: '1021', name: 'Mathematics: Analysis & Approaches SL', mark: 'A', tag: '+p' },
      { code: '2080', name: 'Arabic 1', mark: 'A', tag: 'p', where: 'Saddleback College', college: true },
    ] },

    { term: 'Grade 11 · Spring', years: '2022–23', gpa: '5.40', rows: [
      { code: '0265', name: 'English 3 HL 1', mark: 'A', tag: '+p' },
      { code: '0416', name: 'AP Statistics', mark: 'A', tag: '+p' },
      { code: '0439', name: 'AP Computer Science A', mark: 'A', tag: '+p' },
      { code: '0764', name: 'AP United States History', mark: 'A+', tag: '+p' },
      { code: '0839', name: 'AP Psychology', mark: 'A', tag: '+p' },
      { code: '1011', name: 'Physics of the Universe Honors', mark: 'A', tag: '+p' },
      { code: '1021', name: 'Mathematics: Analysis & Approaches SL', mark: 'A', tag: '+p' },
      { code: '0570', name: 'Boys Varsity Tennis', mark: 'A', tag: '*' },
    ] },

    { term: 'Grade 11 · Summer', years: '2022–23', gpa: '4.00', where: 'Pacific Coast High School',
      rows: [ { code: '0300', name: 'Health', mark: 'A', tag: 'p' } ] },

    { term: 'Grade 12 · Fall', years: '2023–24', gpa: '5.33', rows: [
      { code: '0270', name: 'English 4 HL 2', mark: 'B+', tag: '+p' },
      { code: '0419', name: 'AP Calculus BC', mark: 'A-', tag: '+p' },
      { code: '0669', name: 'Environmental Systems SL', mark: 'A-', tag: '+p' },
      { code: '0670', name: 'AP Physics C: Mechanics', mark: 'A-', tag: '+p' },
      { code: '0811', name: 'History of the Americas HL 2', mark: 'A-', tag: '+p' },
      { code: '0827', name: 'Psychology HL 2', mark: 'A', tag: '+p' },
      { code: '0778', name: 'AP US Government & Politics', mark: 'A', tag: '+p', where: 'SVUSD Virtual Academy' },
      { code: '2080', name: 'Arabic 3', mark: 'A', tag: 'p', where: 'Saddleback College', college: true },
      { code: '2082', name: 'Computer Information Management 7A', mark: 'A', tag: 'p', where: 'Saddleback College', college: true },
      { code: '2082', name: 'History 74', mark: 'A', tag: 'p', where: 'Saddleback College', college: true },
    ] },

    { term: 'Grade 12 · Spring', years: '2023–24', gpa: '5.40', rows: [
      { code: '0270', name: 'English 4 HL 2', mark: 'A-', tag: '+p' },
      { code: '0419', name: 'AP Calculus BC', mark: 'A', tag: '+p' },
      { code: '0669', name: 'Environmental Systems SL', mark: 'A-', tag: '+p' },
      { code: '0670', name: 'AP Physics C: Mechanics', mark: 'A-', tag: '+p' },
      { code: '0811', name: 'History of the Americas HL 2', mark: 'A', tag: '+p' },
      { code: '0827', name: 'Psychology HL 2', mark: 'A-', tag: '+p' },
      { code: '0741', name: 'AP Macroeconomics', mark: 'A-', tag: '+p', where: 'SVUSD Virtual Academy' },
    ] },
  ],

  ap: {
    awards: [
      { year: '2024', name: 'AP Scholar with Distinction' },
      { year: '2023', name: 'AP Scholar with Distinction' },
      { year: '2022', name: 'AP Scholar' },
    ],
    exams: [
      { name: 'Calculus BC', score: 5, year: '2024', sub: 'AB subscore 5' },
      { name: 'Physics C: Mechanics', score: 4, year: '2024' },
      { name: 'Computer Science A', score: 5, year: '2023' },
      { name: 'Psychology', score: 5, year: '2023' },
      { name: 'Statistics', score: 5, year: '2023' },
      { name: 'United States History', score: 5, year: '2023' },
      { name: 'Computer Science Principles', score: 5, year: '2022' },
      { name: 'European History', score: 4, year: '2022' },
      { name: 'Human Geography', score: 4, year: '2021' },
    ],
  },

  ib: {
    result: 'Diploma awarded',
    points: 34,
    bonus: 1,
    exams: [
      { name: 'English A: Literature HL', score: 5, year: '2024' },
      { name: 'History of the Americas HL', score: 5, year: '2024' },
      { name: 'Psychology HL', score: 5, year: '2024' },
      { name: 'Arabic Ab Initio SL', score: 5, year: '2024' },
      { name: 'Mathematics: Analysis & Approaches SL', score: 7, year: '2023' },
      { name: 'Computer Science SL', score: 6, year: '2023' },
      { name: 'Theory of Knowledge', score: 'B', year: '2024', letter: true },
      { name: 'Extended Essay: History', score: 'D', year: '2024', letter: true },
    ],
  },
};
