import React, { useState, useEffect } from "react";
import { useServiceConsumer } from "../../service/Service.Consume";
import { Divider, Grid, Skeleton } from "@chakra-ui/react";
import { devicons } from "./devicons";
import "./reportLIsting.css";

const RepoListing = () => {
  const [repoData, setRepoData] = useState<Array<object>>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const consume: any = useServiceConsumer();

  useEffect(() => {
    setIsloading(true);
    const fetcher = async () => {
      let data = await consume.getAllRepo();
      setRepoData((prev: any) => {
        return (prev = data[0]);
      });
      setIsloading(false);
    };
    fetcher();
  }, []);

  return (
    <Grid
      style={{ marginTop: "20px" }}
      templateColumns="repeat(3, 1fr)"
      gap={3}
    >
      {!isLoading
        ? !!repoData.length &&
          repoData?.map((data: any) => {
            return <RepositoryCard data={data} key={data.id} />;
          })
        : Array(20)
            .fill(null)
            .map((_, idx) => {
              return (
                <Skeleton
                  key={idx}
                  height="210px"
                  width="400px"
                  style={{ borderRadius: "15px" }}
                ></Skeleton>
              );
            })}
    </Grid>
  );
};

const RepositoryCard = (props: any) => {
  const { data } = props;
  return (
    <div className="repo-card">
      <h3>{data.name || "-"}</h3>
      <span>{data.description || "-"}</span>
      <div
        className="dev-icon"
        dangerouslySetInnerHTML={{ __html: devicons[data.language] }}
      />
      <Divider />
      <a href={`${data?.html_url}`} target="_blank">View Project</a>
    </div>
  );
};

export default RepoListing;
