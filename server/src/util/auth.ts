import bcrypt from "bcryptjs"

export const hashNewPassword = (password: string) => {
    return bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(password, salt))
}