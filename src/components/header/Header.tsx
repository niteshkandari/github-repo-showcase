import React, { useEffect, useState } from "react";
import { useServiceConsumer } from "../../service/Service.Consume";
import {
  Tag,
  TagLabel,
  Avatar,
  Divider,
  Stack,
  Code,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import "./header.css";

type profileType = {
  gists: string;
  repos: string;
  avatarUrl: string;
  bio: string;
  userName: string;
  repoUrl: string;
  location: string;
};

const Header = () => {
  const consumer: any = useServiceConsumer();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [profile, setProfile] = useState<profileType>({
    gists: "",
    repos: "",
    avatarUrl: "",
    bio: "",
    userName: "",
    repoUrl: "",
    location: "",
  });
  const codeHeight = {
    fontSize: "20px",
  };

  useEffect(() => {
    setIsloading(true);
    const fetcher = async () => {
      let success = await consumer.getProfile();
      console.log(success, "c");
      if (!success) return;
      const {
        public_gists: gists,
        public_repos: repos,
        avatar_url: avatarUrl,
        bio,
        name: userName,
        repos_url: repoUrl,
        location,
      } = success;
      setProfile((prev: profileType) => {
        return (prev = {
          gists,
          repos,
          avatarUrl,
          bio,
          userName,
          repoUrl,
          location,
        });
      });
      setIsloading(false);
    };
    fetcher();
  }, []);

  return (
    <div className="header">
      <div className="avatar">
        {!isLoading ? (
          <Avatar
            height="150"
            width="150"
            src={`${profile?.avatarUrl}`}
            size="xs"
            ml={-1}
            mr={2}
          />
        ) : (
          <SkeletonCircle height="150px" width="150px" />
        )}
      </div>
      <Divider orientation="vertical" />
      <Skeleton isLoaded={!isLoading}>
        <Stack direction="column">
          <Tag size="lg" colorScheme="red" borderRadius="full">
            <Avatar src="" size="xs" name="Nitesh Kandari" ml={-1} mr={2} />
            <TagLabel>Nitesh Kandari</TagLabel>
          </Tag>
          <Code
            style={codeHeight}
            children={`username : ${profile?.userName || "-"}`}
          />
          <Code
            style={codeHeight}
            colorScheme="red"
            children={profile?.bio || "-"}
          />
          <Code
            style={codeHeight}
            colorScheme="yellow"
            children={`Location: ${profile?.location || "-"}`}
          />
          <Code
            style={codeHeight}
            colorScheme="pink"
            children={`@niteshkandari Repos: ${profile?.repos || "-"} Gists: ${
              profile?.gists || "-"
            }`}
          />
        </Stack>
      </Skeleton>
    </div>
  );
};

export default Header;
