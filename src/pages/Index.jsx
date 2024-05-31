import { Box, Container, Flex, Input, VStack, Text, Spacer, Heading, HStack, Avatar, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";

const mockChats = [
  { id: 1, name: "John Doe", message: "Hello there!" },
  { id: 2, name: "Jane Smith", message: "Hi, how are you?" },
  { id: 3, name: "John Doe", message: "I'm good, thanks!" },
  { id: 4, name: "Jane Smith", message: "That's great to hear." },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      const newMessage = { id: selectedChat.id, name: "You", message: messageInput };
      setSelectedChat({ ...selectedChat, message: [...selectedChat.message, newMessage] });
      setMessageInput("");
    }
  };

  return (
    <Container maxW="full" height="100vh" display="flex" flexDirection="column">
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Heading size="md">WhatsApp Clone</Heading>
      </Flex>

      <Flex flex="1" overflow="hidden">
        <Box w="300px" bg="gray.100" p={4} overflowY="auto">
          <VStack spacing={4} align="stretch">
            {mockChats.map((chat) => (
              <Box key={chat.id} p={2} bg={selectedChat.id === chat.id ? "blue.100" : undefined} onClick={() => handleChatSelection(chat)}>
                <HStack>
                  <Avatar name={chat.name} />
                  <Text>{chat.name}</Text>
                  <Spacer />
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box flex="1" p={4} bg="white" overflowY="auto">
          <VStack spacing={4} align="stretch">
            {selectedChat.messages.map((message, index) => (
              <Box key={index} p={2} bg={message.name === "You" ? "blue.100" : undefined} alignSelf={message.name === "You" ? "flex-end" : "flex-start"}>
                <Text fontWeight="bold">{message.name}</Text>
                <Text>{message.message}</Text>
              </Box>
            ))}
          </VStack>
          <Flex as="form" mt={4} onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <Textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder="Type a message..." resize="none" />
            <Button type="submit" colorScheme="blue" ml={2}>Send</Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Index;