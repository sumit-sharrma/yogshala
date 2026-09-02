/*
 * Google Apps Script — Yog Shala Pre-Assessment Form Webhook
 *
 * SETUP:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this entire script
 * 4. Click "Run" once to authorize
 * 5. Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the deployment URL and add it to .env.local as NEXT_PUBLIC_GOOGLE_SHEETS_URL
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Header row (only writes if sheet is empty)
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Submitted At",
      "Full Name",
      "Age",
      "Height (cm)",
      "Weight (kg)",
      "Occupation",
      "Main Concern",
      "Primary Goal",
      "Brief Description",
      "Currently In Pain",
      "Pain Location",
      "Pain Side",
      "Pain Duration",
      "Pain Severity",
      "Pain Description",
      "Pain Worse",
      "Pain Relief",
      "Significant Injury",
      "Injury Location",
      "Injury When",
      "Had Surgery",
      "Diagnosed Conditions",
      "Current Treatment",
      "Sitting Hours",
      "Computer Hours",
      "Phone Hours",
      "Morning Pain",
      "Currently Exercise",
      "Exercise Days",
      "Exercise Type",
      "Stretch Regularly",
      "Tried Posture Correction",
      "What Tried",
      "Biggest Challenge",
      "Success Look Like",
      "Has Deadline",
      "Target Date",
      "Daily Commitment",
      "Best Time of Day",
      "Commitment Level",
      "Additional Notes"
    ];
    sheet.appendRow(headers);
  }

  // Helper to join arrays
  function join(val) {
    if (Array.isArray(val)) return val.join(", ");
    return val || "";
  }

  var row = [
    data.submittedAt || new Date().toISOString(),
    data.fullName || "",
    data.age || "",
    data.height || "",
    data.weight || "",
    data.occupation || "",
    join(data.mainConcern),
    data.primaryGoal || "",
    data.briefDescription || "",
    data.currentlyInPain || "",
    join(data.painLocation),
    data.painSide || "",
    data.painDuration || "",
    data.painSeverity ?? "",
    join(data.painDescription),
    join(data.painWorse),
    join(data.painRelief),
    data.significantInjury || "",
    data.injuryLocation || "",
    data.injuryWhen || "",
    data.hadSurgery || "",
    join(data.diagnosedConditions),
    data.currentTreatment || "",
    data.sittingHours || "",
    data.computerHours || "",
    data.phoneHours || "",
    data.morningPain || "",
    data.currentlyExercise || "",
    data.exerciseDays || "",
    join(data.exerciseType),
    data.stretchRegularly || "",
    data.triedPostureCorrection || "",
    join(data.whatTried),
    data.biggestChallenge || "",
    data.successLookLike || "",
    data.hasDeadline || "",
    data.targetDate || "",
    data.dailyCommitment || "",
    data.bestTimeOfDay || "",
    data.commitmentLevel ?? "",
    data.additionalNotes || ""
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
