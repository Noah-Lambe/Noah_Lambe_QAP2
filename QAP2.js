// Programming With JavaScript - QAP2
// Name: Noah Lambe
// Date: November 17, 2024

// 1
function changeString() {
  let str =
    "    This is a test sentence. It includes tabs, spaces, and periods.    ";
  let trimmedStr = str.trim();
  let regex = /[\s.]/g;
  let replacedStr = trimmedStr.replace(regex, "_");
  return replacedStr;
}

console.log(changeString());

// 2
function createVideo(src, width, controls = true) {
  const video = document.createElement("video");
  video.src = src;
  video.controls = controls;

  if (Number.isInteger(width) && width > 0) {
    video.width = width;
  } else {
    video.width = 500;
  }

  if (controls === false) {
    video.autoplay = true;
  }

  document.body.appendChild(video);
}

createVideo(
  "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
  350,
  true
);

// 3
function parseDateString(value) {
  const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const validDate = value.match(dateRegex);
  if (!validDate) {
    throw new Error("Invalid date format");
  }
  const date = new Date();
  date.setFullYear(validDate[1]);
  date.setMonth(validDate[2] - 1);
  date.setDate(validDate[3]);

  return date;
}

console.log(parseDateString("1997-03-25"));

// 4
function toDateString(dateValue) {
  try {
    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
      throw new Error("Invalid date value provided");
    }

    const year = dateValue.getFullYear();
    const month = String(dateValue.getMonth() + 1).padStart(2, "0");
    const day = String(dateValue.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

console.log(toDateString(new Date()));
// console.log(toDateString("invalid date"));

// 5
function normalizeCoordinates(coord) {
  try {
    let lat, lng;

    if (coord.startsWith("[") && coord.endsWith("]")) {
      [lng, lat] = coord.slice(1, -1).split(",").map(Number);
    } else {
      [lat, lng] = coord.split(",").map(Number);
    }

    const isLatValid = lat >= -90 && lat <= 90;
    const isLngValid = lng >= -180 && lng <= 180;

    if (!isLatValid || !isLngValid) {
      [lat, lng] = [lng, lat];
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw new Error("Coordinates out of range");
    }

    return `(${lat}, ${lng})`;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

console.log(normalizeCoordinates("42.9755,-77.4369"));
console.log(normalizeCoordinates("[-77.4369, 42.9755]"));
console.log(normalizeCoordinates("[45.0, 200.0]"));

// 6
function formatCoordinates(...values) {
  try {
    coordArrray = values.map(normalizeCoordinates).filter(Boolean).join(", ");

    if (coordArrray.length === 0) {
      throw new Error("No valid coordinates provided");
    }

    return `(${coordArrray})`;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

console.log(
  formatCoordinates("42.9755,-77.4369", "[-62.1234, 42.9755]", "300,-9000")
);

// 7
function mimeFromFilename(filename) {
  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex === -1 || dotIndex === filename.length - 1) {
    return "application/octet-stream";
  }

  const extension = filename.slice(dotIndex + 1).toLowerCase();

  switch (extension) {
    case "html":
    case "htm":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";
    case "csv":
      return "text/csv";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "bmp":
      return "image/bmp";
    case "ico":
    case "cur":
      return "image/x-icon";
    case "png":
      return "image/png";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    case "mp3":
      return "audio/mp3";
    case "wav":
      return "audio/wav";
    case "mp4":
      return "video/mp4";
    case "webm":
      return "video/webm";
    case "mpeg":
      return "video/mpeg";
    case "avi":
      return "video/x-msvideo";
    case "json":
      return "application/json";
    case "pdf":
      return "application/pdf";
    case "zip":
      return "application/zip";
    case "ttf":
      return "font/ttf";
    case "woff":
      return "font/woff";
    default:
      return "application/octet-stream";
  }
}
console.log(mimeFromFilename("example.mp4"));

// 8
function generateLicenseLink(licenseCode, targetBlank = false) {
  let licenseType = licenseCode.toUpperCase();
  const link = document.createElement("a");

  switch (licenseCode) {
    case "CC-BY":
      licenseType = "Creative Commons Attribution License";

      break;
    case "CC-BY-SA":
      licenseType = "Creative Commons Attribution-ShareAlike License";
      break;
    case "CC-BY-ND":
      licenseType = "Creative Commons Attribution-NoDerivatives License";
      break;
    case "CC-BY-NC":
      licenseType = "Creative Commons Attribution-NonCommercial License";
      break;
    case "CC-BY-NC-SA":
      licenseType =
        "Creative Commons Attribution-NonCommercial-ShareAlike License";
      break;
    case "CC-BY-NC-ND":
      licenseType =
        "Creative Commons Attribution-NonCommercial-NoDerivatives License";
      break;
    default:
      licenseType = "All rights reserved";
      licenseCode = "no-permission";
  }

  link.textContent = licenseType;
  link.href = `https://creativecommons.org/licenses/${licenseCode.toLowerCase()}/4.0/`;

  if (targetBlank) {
    link.target = "_blank";
  }

  document.body.appendChild(link);
  return link;
}

generateLicenseLink("CC-BY-NC", true);

// 9 Part 1
function pureBool(value) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    value = value.toLowerCase();
  }

  const trueValues = ["yes", "y", "oui", "o", "t", "true", "vrai", "v", "1"];
  const falseValues = ["no", "n", "non", "f", "false", "faux", "0"];

  if (trueValues.includes(value)) {
    return true;
  }

  if (falseValues.includes(value)) {
    return false;
  }

  if (typeof value === "number" && value > 0) {
    return true;
  }

  return false;
}

console.log(pureBool(true));
// console.log(pureBool(false));
// console.log(pureBool("yes"));
// console.log(pureBool("y"));
// console.log(pureBool("oui"));

// 9 Part 2
function every(...args) {
  try {
    return args.every((arg) => pureBool(arg));
  } catch (error) {
    console.error("Invalid data detected:", error);
    return false;
  }
}

function any(...args) {
  try {
    return args.some((arg) => pureBool(arg));
  } catch (error) {
    console.error("Invalid data detected:", error);
    return false;
  }
}

function none(...args) {
  try {
    return args.every((arg) => !pureBool(arg));
  } catch (error) {
    console.error("Invalid data detected:", error);
    return false;
  }
}

console.log(every("Y", "yes", 1));
// console.log(any("Y", "no", 1));
// console.log(none("Y", "invalid", 1));
// console.log(every("Y", "no", "false"));
// console.log(any("no", "n", 0));
// console.log(none("no", "n", 0));

// 10
function buildUrl(query, order, count, license) {
  try {
    const validOrders = ["ascending", "descending"];
    if (!validOrders.includes(order)) {
      throw new Error(
        `Invalid order value: ${order}. Must be 'ascending' or 'descending'.`
      );
    }

    if (typeof count !== "number" || count < 1 || count > 50) {
      throw new Error(
        `Invalid count value: ${count}. Must be a number between 1 and 50.`
      );
    }

    const validLicenses = [
      "none",
      "any",
      "cc-by",
      "cc-by-nc",
      "cc-by-sa",
      "cc-by-nd",
      "cc-by-nc-sa",
      "cc-by-nc-nd",
    ];

    if (!validLicenses.includes(license)) {
      throw new Error(
        `Invalid license value: ${license}. Must be one of ${validLicenses.join(
          ", "
        )}.`
      );
    }

    const encodedQuery = encodeURIComponent(query);

    const baseUrl = "https://api.inaturalist.org/v2/observations";
    const url = `${baseUrl}?query=${encodedQuery}&count=${count}&order=${order}&license=${license}`;

    return url;
  } catch (error) {
    console.error(`Error building URL: ${error.message}`);
    return null;
  }
}

console.log(buildUrl("Monarch Butterfly", "ascending", 25, "cc-by"));
