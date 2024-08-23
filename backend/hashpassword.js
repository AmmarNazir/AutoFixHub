const bcrypt = require("bcryptjs");

const generateHashedPassword = async () => {
  const password =
    "$2a$10$v5l.rbNd9b4CbSwiGciQhuAWaA/hzc8a5LChe1PKRefFAJRa1pbxG";
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password: ${hashedPassword}`);
};

generateHashedPassword();

// const bcrypt = require("bcryptjs");

// const plainPassword = "admin123"; // The password you used
// const hashedPassword =
//   "$2a$10$l0LGct13lQQSSDw4b7O0J.Y4kTjhMnhu0r3RTD0WsHK29i.rfKo/u"; // The hash from the database

// bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
//   if (err) {
//     console.error("Error during comparison:", err);
//   } else {
//     console.log("Password matches:", result); // Should output true if it matches
//   }
// });
