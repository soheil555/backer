import { forwardRef, ButtonProps, Button } from "@chakra-ui/react";

const AddSubscriptionButton = forwardRef<ButtonProps, "button">(
  (props, ref) => {
    return (
      <Button ref={ref} {...props}>
        Add a Subscription Plan
      </Button>
    );
  }
);

export default AddSubscriptionButton;
