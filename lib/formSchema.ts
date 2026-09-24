import { FormSection } from "./types";

export function isValidEmail(value: string | number | string[] | undefined): boolean {
  if (typeof value !== "string" || !value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function emailValidator(value: string | number | string[] | undefined): string | undefined {
  if (value === undefined || value === "" || (typeof value === "string" && !value.trim())) return undefined;
  return isValidEmail(value) ? undefined : "Please enter a valid email address (e.g. name@example.com)";
}

export function phoneValidator(value: string | number | string[] | undefined): string | undefined {
  if (value === undefined || value === "" || (typeof value === "string" && !value.trim())) return undefined;
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return "Please enter a valid phone number (7–15 digits)";
  return undefined;
}

export const formSections: FormSection[] = [
  {
    id: "personal-info",
    title: "Basic Information",
    subtitle: "We use this to tailor the session to your body and daily routine.",
    questions: [
      { id: "fullName", label: "Name", type: "text", required: true },
      { id: "age", label: "Age", type: "number", required: true, min: 1, max: 120 },
      {
        id: "gender",
        label: "Gender",
        type: "single-select",
        required: true,
        options: [
          { label: "Female", value: "female" },
          { label: "Male", value: "male" },
          { label: "Prefer not to say", value: "prefer-not-to-say" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "genderOther",
        label: "Please specify your gender",
        type: "text",
        placeholder: "Your gender...",
        required: true,
        dependsOn: { questionId: "gender", value: "other" },
      },
      { id: "occupation", label: "Occupation", type: "text", required: true },
      {
        id: "activityLevel",
        label: "How active are you?",
        type: "single-select",
        required: true,
        options: [
          { label: "Mostly sitting", value: "mostly-sitting" },
          { label: "Lightly active", value: "lightly-active" },
          { label: "Exercise regularly", value: "exercise-regularly" },
        ],
      },
      { id: "country", label: "Which country are you from?", type: "text", required: true },
      { id: "height", label: "What is your height (cm)?", type: "number", min: 50, max: 250 },
      { id: "weight", label: "What is your weight (kg)?", type: "number", min: 20, max: 300 },
      {
        id: "lifestyle",
        label: "Do you have a sedentary lifestyle, standing job, or a combination of both?",
        type: "single-select",
        options: [
          { label: "Mostly sedentary", value: "sedentary" },
          { label: "Standing job", value: "standing" },
          { label: "Combination of both", value: "combination" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "lifestyleOther",
        label: "Please describe your lifestyle",
        type: "textarea",
        placeholder: "Tell us more about your work/lifestyle...",
        required: true,
        dependsOn: { questionId: "lifestyle", value: "other" },
      },
      {
        id: "email",
        label: "What is your email id?",
        type: "text",
        placeholder: "you@example.com",
        required: true,
        validate: emailValidator,
      },
      {
        id: "phone",
        label: "What is your phone number?",
        type: "text",
        placeholder: "e.g. +91 98765 43210",
        required: true,
        validate: phoneValidator,
      },
    ],
  },
  {
    id: "main-problem",
    title: "Main Problem",
    subtitle: "This helps us put your main concern at the centre of the session.",
    questions: [
      {
        id: "mainConcern",
        label: "What is your main problem?",
        type: "multi-select",
        required: true,
        options: [
          { label: "Neck", value: "neck" },
          { label: "Shoulder", value: "shoulder" },
          { label: "Upper Back", value: "upper-back" },
          { label: "Lower Back", value: "lower-back" },
          { label: "Hip", value: "hip" },
          { label: "Knee", value: "knee" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "mainConcernOther",
        label: "Please specify your main problem",
        type: "textarea",
        placeholder: "Tell us in your own words...",
        required: true,
        dependsOn: { questionId: "mainConcern", value: "other" },
      },
      // {
      //   id: "mainSide",
      //   label: "Which side?",
      //   type: "single-select",
      //   options: [
      //     { label: "Right", value: "right" },
      //     { label: "Left", value: "left" },
      //     { label: "Both sides", value: "both" },
      //     { label: "Centre", value: "centre" },
      //   ],
      //   hideWhen: { questionId: "mainConcern", value: "neck" },
      // },
      {
        id: "problemDuration",
        label: "How long have you had this problem?",
        type: "single-select",
        options: [
          { label: "Less than 1 week", value: "less-than-1-week" },
          { label: "1–4 weeks", value: "1-4-weeks" },
          { label: "1–6 months", value: "1-6-months" },
          { label: "More than 6 months", value: "more-than-6-months" },
        ],
      },
      {
        id: "howItStarted",
        label: "How did it start?",
        type: "single-select",
        options: [
          { label: "Suddenly", value: "suddenly" },
          { label: "Gradually", value: "gradually" },
          { label: "After an injury/accident", value: "after-injury" },
          { label: "After exercise", value: "after-exercise" },
          { label: "I don't know", value: "dont-know" },
        ],
      },
    ],
  },
  {
    id: "pain-level",
    title: "Pain Level",
    subtitle: "0 = No pain | 10 = Worst pain",
    questions: [
      {
        id: "painSeverity",
        label: "How strong is your pain?",
        type: "slider",
        min: 0,
        max: 10,
        step: 1,
      },
      {
        id: "painFeelsLike",
        label: "What does your pain feel like?",
        type: "multi-select",
        options: [
          { label: "Dull/Aching", value: "dull-aching" },
          { label: "Sharp", value: "sharp" },
          { label: "Tight/Stiff", value: "tight-stiff" },
          { label: "Burning", value: "burning" },
          { label: "Tingling/Numbness", value: "tingling-numbness" },
        ],
        hideWhen: {
          questionId: "mainConcern",
          value: ["neck", "shoulder", "upper-back", "lower-back", "knee"],
        },
      },
    ],
  },
  {
    id: "pain-triggers",
    title: "What Makes It Worse or Better",
    subtitle: "Knowing what eases or worsens pain helps us choose safe movements.",
    questions: [
      {
        id: "painWorse",
        label: "What activities increase your pain?",
        type: "multi-select",
        options: [
          { label: "Sitting", value: "sitting" },
          { label: "Standing", value: "standing" },
          { label: "Walking", value: "walking" },
          { label: "Sleeping", value: "sleeping" },
          { label: "Bending", value: "bending" },
          { label: "Lifting", value: "lifting" },
          { label: "Exercise", value: "exercise" },
          { label: "Yoga", value: "yoga" },
          { label: "Other", value: "other" },
        ],
        hideWhen: {
          questionId: "mainConcern",
          value: ["upper-back", "lower-back"],
        },
      },
      {
        id: "painWorseOther",
        label: "What other activities increase your pain?",
        type: "textarea",
        placeholder: "Tell us in your own words...",
        required: true,
        dependsOn: { questionId: "painWorse", value: "other" },
      },
      {
        id: "painBetter",
        label: "What makes it better?",
        type: "multi-select",
        options: [
          { label: "Rest", value: "rest" },
          { label: "Movement", value: "movement" },
          { label: "Stretching", value: "stretching" },
          { label: "Massage", value: "massage" },
          { label: "Heat", value: "heat" },
          { label: "Nothing helps", value: "nothing" },
        ],
      },
      {
        id: "painCauses",
        label: "Do you think your pain may be related to any of the following?",
        type: "multi-select",
        options: [
          { label: "Long sitting", value: "long-sitting" },
          { label: "Laptop/computer work", value: "computer-work" },
          { label: "Mobile phone use", value: "phone-use" },
          { label: "Exercise/gym", value: "exercise" },
          { label: "Yoga practice", value: "yoga" },
          { label: "Poor sleeping position", value: "poor-sleeping" },
          { label: "Injury/accident", value: "injury" },
          { label: "Stress", value: "stress" },
          { label: "Not sure", value: "not-sure" },
        ],
      },
    ],
  },
  {
    id: "neck-pain",
    title: "Neck Pain – Quick Questions",
    subtitle: "Where and how your neck pain behaves helps us plan safe movement.",
    dependsOn: { questionId: "mainConcern", value: "neck" },
    questions: [
      {
        id: "neckLocation",
        label: "Where is your neck pain?",
        type: "single-select",
        options: [
          { label: "Centre", value: "centre" },
          { label: "Right side", value: "right" },
          { label: "Left side", value: "left" },
          { label: "Both sides", value: "both" },
        ],
      },
      {
        id: "neckTravel",
        label: "Does the pain travel?",
        type: "single-select",
        options: [
          { label: "No", value: "no" },
          { label: "To the shoulder", value: "shoulder" },
          { label: "Into the arm", value: "arm" },
          { label: "Into the hand/fingers", value: "hand" },
        ],
      },
      {
        id: "neckMovement",
        label: "Which movement is difficult?",
        type: "multi-select",
        options: [
          { label: "Looking down", value: "looking-down" },
          { label: "Looking up", value: "looking-up" },
          { label: "Looking right/left", value: "looking-sides" },
          { label: "Turning the neck", value: "turning" },
        ],
      },
      {
        id: "neckExperience",
        label: "Do you experience?",
        type: "multi-select",
        options: [
          { label: "Stiffness", value: "stiffness" },
          { label: "Headache", value: "headache" },
          { label: "Tingling/numbness", value: "tingling-numbness" },
          { label: "Weakness in arm/hand", value: "weakness" },
        ],
      },
    ],
  },
  {
    id: "shoulder-pain",
    title: "Shoulder Pain – Quick Questions",
    subtitle: "Every shoulder moves differently — these details tell us what to avoid.",
    dependsOn: { questionId: "mainConcern", value: "shoulder" },
    questions: [
      {
        id: "shoulderLocation",
        label: "Where do you feel pain?",
        type: "single-select",
        options: [
          { label: "Front", value: "front" },
          { label: "Side", value: "side" },
          { label: "Back", value: "back" },
          { label: "Deep inside", value: "deep-inside" },
          { label: "Not sure", value: "not-sure" },
        ],
      },
      {
        id: "shoulderMovement",
        label: "Which movement hurts?",
        type: "multi-select",
        options: [
          { label: "Raising the arm forward", value: "raise-forward" },
          { label: "Raising the arm sideways", value: "raise-sideways" },
          { label: "Reaching overhead", value: "overhead" },
          { label: "Reaching behind the back", value: "behind-back" },
          { label: "Push-ups/Plank", value: "pushups-plank" },
          { label: "Yoga poses", value: "yoga" },
        ],
      },
      {
        id: "shoulderExperience",
        label: "Do you experience?",
        type: "multi-select",
        options: [
          { label: "Weakness", value: "weakness" },
          { label: "Stiffness", value: "stiffness" },
          { label: "Clicking", value: "clicking" },
          { label: "Feeling of instability", value: "instability" },
        ],
      },
      {
        id: "shoulderPreviousInjury",
        label: "Have you previously injured or dislocated this shoulder?",
        type: "single-select",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
    ],
  },
  {
    id: "back-pain",
    title: "Back Pain – Quick Questions",
    subtitle: "Pinpointing where and when it hurts keeps your assessment safe.",
    dependsOn: { questionId: "mainConcern", value: ["upper-back", "lower-back"] },
    questions: [
      {
        id: "backLocation",
        label: "Where is the pain?",
        type: "single-select",
        options: [
          { label: "Upper back", value: "upper-back" },
          { label: "Middle back", value: "middle-back" },
          { label: "Lower back", value: "lower-back" },
        ],
      },
      {
        id: "backTravel",
        label: "Does the pain travel?",
        type: "single-select",
        options: [
          { label: "No", value: "no" },
          { label: "Buttocks", value: "buttocks" },
          { label: "Leg", value: "leg" },
        ],
      },
      {
        id: "backWorse",
        label: "What makes it worse?",
        type: "multi-select",
        options: [
          { label: "Sitting", value: "sitting" },
          { label: "Standing", value: "standing" },
          { label: "Walking", value: "walking" },
          { label: "Bending forward", value: "bending-forward" },
          { label: "Bending backwards", value: "bending-backwards" },
        ],
      },
      {
        id: "backExperience",
        label: "Do you feel?",
        type: "multi-select",
        options: [
          { label: "Stiffness", value: "stiffness" },
          { label: "Tingling/numbness", value: "tingling-numbness" },
          { label: "Weakness", value: "weakness" },
        ],
      },
    ],
  },
  {
    id: "knee-pain",
    title: "Knee Pain – Quick Questions",
    subtitle: "When and how your knee reacts helps us choose the right poses.",
    dependsOn: { questionId: "mainConcern", value: "knee" },
    questions: [
      {
        id: "kneeLocation",
        label: "Where is your knee pain?",
        type: "single-select",
        options: [
          { label: "Front", value: "front" },
          { label: "Inside", value: "inside" },
          { label: "Outside", value: "outside" },
          { label: "Back", value: "back" },
        ],
      },
      {
        id: "kneeWhen",
        label: "When does it hurt?",
        type: "multi-select",
        options: [
          { label: "Walking", value: "walking" },
          { label: "Stairs", value: "stairs" },
          { label: "Squatting", value: "squatting" },
          { label: "Running", value: "running" },
          { label: "Sitting for a long time", value: "sitting" },
        ],
      },
      {
        id: "kneeExperience",
        label: "Do you experience?",
        type: "multi-select",
        options: [
          { label: "Swelling", value: "swelling" },
          { label: "Clicking", value: "clicking" },
          { label: "Feeling of instability", value: "instability" },
          { label: "Locking", value: "locking" },
        ],
      },
    ],
  },
  {
    id: "medical-goals",
    title: "Medical Questions & Goals",
    subtitle: "Your safety comes first — we tailor everything to your goals.",
    questions: [
      {
        id: "medicalHistory",
        label: "Have you had any of the following?",
        type: "multi-select",
        options: [
          { label: "Previous surgery", value: "surgery" },
          { label: "Major injury", value: "major-injury" },
          { label: "Fracture", value: "fracture" },
          { label: "Doctor-diagnosed condition related to this problem", value: "diagnosed" },
          { label: "None of the above", value: "none" },
        ],
      },
      {
        id: "currentTreatment",
        label: "Are you currently under medical treatment or physiotherapy?",
        type: "single-select",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ],
      },
      {
        id: "mainGoal",
        label: "What is your main goal?",
        type: "multi-select",
        required: true,
        options: [
          { label: "Reduce pain", value: "reduce-pain" },
          { label: "Improve flexibility", value: "improve-flexibility" },
          { label: "Improve strength", value: "improve-strength" },
          { label: "Return to yoga/exercise", value: "return-to-yoga" },
          { label: "Improve posture", value: "improve-posture" },
          { label: "Move without fear", value: "move-without-fear" },
          { label: "Other", value: "other" },
        ],
      },
      {
        id: "mainGoalOther",
        label: "Please describe your main goal",
        type: "textarea",
        placeholder: "Tell us what you'd like to achieve...",
        required: true,
        dependsOn: { questionId: "mainGoal", value: "other" },
      },
    ],
  },
];

export const disclaimerQuestion = {
  id: "disclaimerAccepted",
  label: "Disclaimer & Consent",
  type: "agree" as const,
  required: true,
  description: [
    "1. Assumption of Risk: Yoga involves physical activity, and by participating, you assume the risk of any injury or damage resulting from your participation in the class. Prashant Ji is not responsible for any injuries or damages that may occur.",
    "2. Live Streaming: The class may be live-streamed or recorded. By participating, you consent to your image and voice being captured during the live session. Prashant Ji reserves the right to use the recordings for promotional or educational purposes.",
    "3. Purpose: The photographs and videos may be used for promotional, educational, or informational purposes.",
    "4. No Refunds: Participation fees are non-refundable. Refunds will not be provided for technical issues, participant dissatisfaction, or any other reason.",
    "5. Professional Guidance: Any comments, suggestions, or feedback provided during the body evaluation are for educational and informational purposes only.",
    "6. Confidentiality: Information gathered during any body evaluation will be kept confidential and will only be used for the purpose of providing personalised guidance during the session.",
    "7. When performing yoga assisted stretches, you are authorising us to assist you with the stretches and any necessary modifications.",
  ].join("\n\n"),
  options: [{ label: "I have read and agree to the Disclaimer & Consent terms", value: "accepted" }],
};

export const finalQuestion = {
  id: "additionalNotes",
  label: "Is there anything else you'd like me to know before your assessment?",
  type: "textarea" as const,
  placeholder: "Optional — anything you'd like to share...",
};