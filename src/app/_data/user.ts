// import { cache } from "react";
// import { verifySession } from "../_lib/session";
// import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint";

// export const getUser = cache(async () => {

//     const session = await verifySession();

//     // 2. fetch data from database
//     const user = {}

//     // 3. Filter user data.
//     const filterUser = userDTO(user);
//     return filterUser;
// });

// function userDTO (user: any) {
//     taintUniqueValue(
//         "Do not pass a user session token to the client.",
//         user,
//         user.session.token
//     )

//     return {
//         name: user.name,
//         email: user.email,
//         session: user.session
//     }
// }