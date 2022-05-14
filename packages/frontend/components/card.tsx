import { forwardRef, BoxProps, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
} & BoxProps;

const Card = forwardRef<CardProps, "div">(({ children, ...restProps }, ref) => {
  return (
    <Box
      p={4}
      borderRadius="lg"
      display="flex"
      bg="gray.50"
      ref={ref}
      minH="120px"
      {...restProps}
    >
      {children}
    </Box>
  );
});

export default Card;
