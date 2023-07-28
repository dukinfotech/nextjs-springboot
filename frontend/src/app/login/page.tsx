"use client";

import { api } from "@/utils/api";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeCrossed } from "react-flaticons";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { accessTokenAtom, userInfoAtom } from "@/states/authAtom";

type Credentials = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const setAccessToken = useSetAtom(accessTokenAtom);
  const setUserInfo = useSetAtom(userInfoAtom);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>();

  // Reset accessToken and userInfo cookie
  useEffect(() => {
    setAccessToken("");
    setUserInfo(null);
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const errorMsg = useMemo(() => {
    if (errorCode) {
      return errorCode === 401
        ? "Invalid email or password."
        : "Internal Server Error";
    } else {
      return null;
    }
  }, [errorCode]);

  const handleLogin = async () => {
    if (credentials) {
      setIsLoading(true);
      const res = await api.post("/api/auth/login", credentials);
      setIsLoading(false);
      if (res.ok) {
        var data = await res.text();
        setAccessToken(data);
        router.replace("/admin");
      } else {
        setErrorCode(res.status);
      }
    }
  };

  return (
    <Modal isOpen={true} placement="top-center" hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <i className="text-red-500">{errorMsg}</i>
              <Input
                autoFocus
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                color={errorMsg ? "danger" : "primary"}
                onValueChange={(value) =>
                  setCredentials({ ...credentials, email: value })
                }
                onChange={() => setErrorCode(undefined)}
              />
              <Input
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeCrossed className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                label="Password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                color={errorMsg ? "danger" : "primary"}
                onValueChange={(value) =>
                  setCredentials({ ...credentials, password: value })
                }
                onChange={() => setErrorCode(undefined)}
              />
              {/* <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div> */}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={handleLogin}
                isDisabled={
                  !credentials?.email || !credentials.password || isLoading
                }
              >
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
