import jwt from "jsonwebtoken";

export interface IJwt {
  username: string;
  iat: number;
  exp: number;
}

const JWT_KEY = "T6FMbJYeKP3W7LZnaJYXiBJ9EHBU0PXxPIkQd2HZEdjwLHCBnO"; // todo: hide this

const get_new_token = async (
  data = {}
): Promise<{
  token?: string;
  iat?: IJwt;
}> => {
  const token = jwt.sign(data, JWT_KEY, { expiresIn: "24h" });
  const iat: IJwt = await new Promise((res, _) =>
    verify_token(token, (d, _) => res(d))
  );
  return { token, iat };
};

const verify_token = (token = "", cb: (data: any, error?: any) => void) => {
  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      cb(null, err);
    } else {
      cb(decoded);
    }
  });
};

export { get_new_token, verify_token };
