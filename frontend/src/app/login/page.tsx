"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { Eye, EyeCrossed, Envelope, Lock } from "react-flaticons";

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Modal isOpen={true} placement="top-center" hideCloseButton>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                color="primary"
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
                color="primary"
              />
              {/* <div className="flex py-2 px-1 justify-between">
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div> */}
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Login</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}