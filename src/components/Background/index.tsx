import { Box, ScaleFade } from "@chakra-ui/react";
import { useMemo } from "react";
import { useDeviceSize } from "../../hooks/useDeviceSize";

export const Background = () => {
  const scale = 50;
  const rowsHeight = window.innerWidth / scale;
  const rowsWidth = window.innerHeight / scale;
  const rows = Array.from({ length: rowsHeight }, (_, i) => i + 5);
  const columns = Array.from({ length: rowsWidth }, (_, i) => i + 5);
  const { isMobile } = useDeviceSize();

  const memorizedBackground = useMemo(
    () => (
      <Box
        width="100vw"
        height={isMobile ? "calc(100vh - 85px)" : "100vh"}
        position="fixed"
        left="0"
        top="0"
        zIndex="-1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        background="linear-gradient(to top, black, #121212);"
      >
        {columns.map((column, columnI) => (
          <Box
            className="row"
            key={column + columnI}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {rows.map((row, rowI) => (
              <Box
                height={`${scale}px`}
                width={`${scale}px`}
                key={row + rowI}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <ScaleFade reverse in delay={columnI / 30}>
                  <Box
                    borderRadius="100px"
                    height="2px"
                    width="2px"
                    backgroundColor="gray.50"
                  ></Box>
                </ScaleFade>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    ),
    []
  );

  return <>{memorizedBackground}</>;
};
