import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import { ChangeEvent, FormEvent, useState } from "react";

const Home: NextPage = () => {
  const toast = useToast({
    position: "top",
    isClosable: true,
  });

  const [emailInput, setEmailInput] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailInput) {
      return toast({
        description: "email required",
        status: "error",
      });
    }

    setButtonLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email: emailInput }),
      });
      const data = await res.json();

      if (data.success) {
        toast({
          title: "Joined successfully",
          description: "Thank you for joining the waitlist!",
          status: "success",
        });
      } else {
        throw new Error(
          data?.error || "something went wrong, please try again later"
        );
      }
    } catch (e) {
      toast({
        description: (e as Error).message,
        status: "error",
      });
    }

    setEmailInput("");
    setButtonLoading(false);
  };

  return (
    <>
      <Head>
        <title>Email Collector</title>
        <link rel="icon" href="/mail-icon.png" />
      </Head>
      <Center bg={"blue.400"} minH={"100vh"}>
        <Flex
          maxW={"3xl"}
          dir={"row"}
          alignItems={"center"}
          bg={"white"}
          borderRadius={"20"}
          overflow={"hidden"}
          shadow={"lg"}
        >
          <Box px={"16"}>
            <Heading fontWeight={"bold"} fontSize={"4xl"} lineHeight={"1.1"}>
              Be the first to know when we launch
            </Heading>
            <Text my={4} fontSize={"sm"}>
              Our App will launch soon. Subscribe for updates and get pre-order
              deals! Don&#39;t regret our deals later!!
            </Text>
            <form onSubmit={handleFormSubmit}>
              <Flex gap={"15"}>
                <Input
                  value={emailInput}
                  type="email"
                  placeholder="Enter your email..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmailInput(e.target.value);
                  }}
                />
                <Button
                  isLoading={buttonLoading}
                  type="submit"
                  bg={"red.400"}
                  _hover={{ bg: "orange.200" }}
                  color={"white"}
                >
                  Subscribe
                </Button>
              </Flex>
              <Text ml={"0.5"} mt={"2px"} color={"gray.500"} fontSize={"xs"}>
                Join our pre-order waitlist!
              </Text>
            </form>
          </Box>
          <Box pos={"relative"} width={400} height={400}>
            <Image layout="fill" objectFit="cover" src="/hero.jpg" alt="" />
          </Box>
        </Flex>
      </Center>
    </>
  );
};

export default Home;
