import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
    password: "12323434545656767878989090101212",
    cookieName: "reown_cookie",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export function withSessionRoute(handler, otheroptions) {
    if(otheroptions)
        return withIronSessionApiRoute(handler, {...sessionOptions, ...otheroptions});

    return withIronSessionApiRoute(handler, sessionOptions);

}

export function withSessionSsr(handler, otheroptions) {
    if(otheroptions)
        return withIronSessionSsr(handler, {...sessionOptions, ...otheroptions});
    return withIronSessionSsr(handler, sessionOptions);
}
