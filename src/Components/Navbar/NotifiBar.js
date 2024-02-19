import { Fragment, useState, useEffect, useContext } from "react";
import { Container, VStack, useColorModeValue } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import NotifyComp from "../Notification/NotifyComp";

const baseURL = "http://13.201.184.239";

const NotifiBar = () => {
  const loading = true;
  const baseURL = "http://13.201.184.239";
  const authentication_user = useSelector((state) => state.authentication_user);
  const [notes, setNotes] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const GetNotifications = async () => {
    try {
      const userId = authentication_user.name;
      const res = await axios.get(baseURL + "/api/home/notifylist/", {
        params: { user_id: userId },
      });

      if (res.status === 200) {
        console.log(res.data);
        setNotes(res.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    GetNotifications();
  }, []);
  return (
    <Container
      p={"5px"}
      marginTop={"1%"}
      marginBottom={"4"}
      overflow="auto"
      sx={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "transparent",
        },
      }}
      maxHeight="550px"
      maxWidth={"100%"}
    >
      <VStack
        color={"white"}
        marginTop={"2%"}
        boxShadow={useColorModeValue(
          "2px 6px 8px rgba(160, 174, 192, 0.6)",
          "2px 6px 8px rgba(9, 17, 28, 0.9)"
        )}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {loading &&
          notes.map((data) => (
            <NotifyComp
              name={data.user_name ? data.user_name : data.user}
              message={data.message ? data.message : data.notification_type}
            />
          ))}
      </VStack>
    </Container>
  );
};

export default NotifiBar;
