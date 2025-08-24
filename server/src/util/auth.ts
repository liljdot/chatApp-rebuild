import bcrypt from "bcryptjs"

export const hashNewPassword = (password: string) => {
    return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
}

export const createUniqueProfilepic: (username: string, gender: "male" | "female") => string = (username, gender) => {
    return `https://avatar.iran.liara.run/public/${gender == "male" ? "boy" : "girl"}?username=${username}`
}