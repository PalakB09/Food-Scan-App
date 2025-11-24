import * as FileSystem from "expo-file-system";
// import * as ImageManipulator from "expo-image-manipulator";

const GEMINI_API_KEY = "";

export async function scanFoodWithGemini(imagePath: string) {
  console.log("scanFoodWithGemini CALLED with:", imagePath);

  const uri = imagePath.startsWith("file://")
    ? imagePath
    : "file://" + imagePath;

  console.log("Normalized URI:", uri);

  console.log("Step 1: Reading base64...");
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  console.log("Base64 length:", base64.length);

  const body = {
    contents: [
      {
        parts: [
          {
            text: `Identify the food from this image. 
Return ONLY JSON in EXACT format:

{
  "name": "Food",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0
}
Also detect if the food contains harmful, unhealthy, or high-risk ingredients 
like very high sodium, excessive sugar, trans fats, allergens or artificial additives.

Return JSON with an extra field:

"warning": "explanation or empty string"

If unsure, give your best guess.`
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64,
            },
          },
        ],
      },
    ],
  };

  console.log("Step 2: Sending request...");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const textResponse = await response.text();
  console.log("RAW RESPONSE TEXT:", textResponse);

  let json;
  try {
    json = JSON.parse(textResponse);
  } catch (e) {
    console.log("JSON PARSE ERROR. RAW:", textResponse);
    throw new Error("Gemini returned invalid JSON.");
  }

  const output =
    json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

  if (!output) {
    console.log("EMPTY TEXT OUTPUT:", output);
    throw new Error("Gemini returned no usable content.");
  }

  console.log("MODEL TEXT OUTPUT:", output);

  const cleaned = output.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.log("JSON PARSE ERROR AFTER CLEANING:", cleaned);
    throw new Error("Gemini returned non-JSON output.");
  }
}