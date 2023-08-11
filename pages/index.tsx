import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/legacy/image";
import { ChangeEvent, FormEvent, useState } from "react";

const Home: NextPage = () => {
  const [emailInput, setEmailInput] = useState<String>("");
  const [buttonLoading, setButtonLoading] = useState<Boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(emailInput);
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
              deals! Don't regret our deals later!!
            </Text>
            <form onSubmit={handleFormSubmit}>
              <Flex gap={"15"}>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmailInput(e.target.value);
                  }}
                />
                <Button
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
