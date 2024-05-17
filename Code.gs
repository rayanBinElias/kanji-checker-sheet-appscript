function kanjiReviewChecker() {
  try {
    //set variable for kanji and checker sheet
    const sheet_name_kanji = "Kanji";
    const sheet_name_checker = "Checker";

    //get All existing sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    // console.log(sheet)

    //get value of n3 column in checker sheet
    const n3_kanji = sheet.getSheetByName(sheet_name_checker);
    const n3_kanji_value = n3_kanji.getSheetValues(2, 1, 361, 1);

    //get value for current kanji reveiwed
    // const reviewed_kanji = sheet.getSheetByName(sheet_name_kanji).getSheetValues(2,2,622,1);
    const rangeLoc = "B2:B624";
    const reviewed_kanji = sheet
      .getSheetByName(sheet_name_kanji)
      .getRange(rangeLoc);
    // console.log(reviewed_kanji)

    //find if exist
    for (let i = 0; i < n3_kanji_value.length; i++) {
      text = n3_kanji_value[i][0];
      console.log(text);

      const textFinder = reviewed_kanji.createTextFinder(text);

      const allOccurrences = textFinder.findAll();
      // console.log(allOccurrences);

      const locationList = allOccurrences.map((item) => item.getA1Notation());

      //transform lcoationList to string for B column
      const result = locationList[0];

      //modify index
      let new_i = i + 2;

      if (result == undefined) {
        console.log("No");
        n3_kanji.getRange("B" + new_i).setValue("No");
      } else if (result.includes("B")) {
        console.log("Yes");
        console.log("B" + new_i);
        n3_kanji.getRange("B" + new_i).setValue("Yes");
      }
    }
  } catch (err) {
    //output when error
    console.log("Something is wrong!\n", err.message);
  }
}
