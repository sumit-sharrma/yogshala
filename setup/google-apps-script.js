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

function doGet() {
  return ContentService
    .createTextOutput("Use POST to submit form data.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  if (!e || !e.postData) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: "No data received" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  var headers = [
    "Submitted At",
    "Name",
    "Age",
    "Gender",
    "Occupation",
    "How Active Are You",
    "Country",
    "Height (cm)",
    "Weight (kg)",
    "Lifestyle",
    "Email",
    "Phone",
    "Main Problem",
    "Main Problem Other",
    "Which Side",
    "How Long Have You Had It",
    "How Did It Start",
    "Pain Level (0-10)",
    "Pain Feels Like",
    "Makes It Worse",
    "Makes It Better",
    "Pain Related To",
    "Neck Location",
    "Neck Pain Travel",
    "Neck Difficult Movement",
    "Neck Experience",
    "Shoulder Location",
    "Shoulder Hurtful Movement",
    "Shoulder Experience",
    "Shoulder Previous Injury",
    "Back Location",
    "Back Pain Travel",
    "Back Makes It Worse",
    "Back Experience",
    "Knee Location",
    "When Knee Hurts",
    "Knee Experience",
    "Medical History",
    "Current Treatment",
    "Main Goal",
    "Disclaimer Accepted",
    "Additional Notes"
  ];

  // Self-healing: if the existing header row doesn't match the current schema,
  // clear the sheet and rebuild it so columns always align with the form.
  function headerNeedsReset() {
    if (sheet.getLastRow() === 0) return true;
    var existing = sheet.getRange(1, 1, 1, Math.max(headers.length, sheet.getLastColumn())).getValues()[0];
    for (var i = 0; i < headers.length; i++) {
      if (String(existing[i]).trim() !== headers[i]) return true;
    }
    return false;
  }

  if (headerNeedsReset()) {
    sheet.clear();
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
    join(data.gender),
    data.occupation || "",
    join(data.activityLevel),
    data.country || "",
    data.height || "",
    data.weight || "",
    join(data.lifestyle),
    data.email || "",
    data.phone || "",
    join(data.mainConcern),
    data.mainConcernOther || "",
    join(data.mainSide),
    join(data.problemDuration),
    join(data.howItStarted),
    data.painSeverity ?? "",
    join(data.painFeelsLike),
    join(data.painWorse),
    join(data.painBetter),
    join(data.painCauses),
    join(data.neckLocation),
    join(data.neckTravel),
    join(data.neckMovement),
    join(data.neckExperience),
    join(data.shoulderLocation),
    join(data.shoulderMovement),
    join(data.shoulderExperience),
    join(data.shoulderPreviousInjury),
    join(data.backLocation),
    join(data.backTravel),
    join(data.backWorse),
    join(data.backExperience),
    join(data.kneeLocation),
    join(data.kneeWhen),
    join(data.kneeExperience),
    join(data.medicalHistory),
    join(data.currentTreatment),
    join(data.mainGoal),
    data.disclaimerAccepted || "",
    data.additionalNotes || ""
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}