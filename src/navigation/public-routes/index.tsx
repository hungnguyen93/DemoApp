import CalendarScreen from "~modules/calendar/Calendar";
import SignIn from "../../modules/authen/sign-in/SignIn";
import SignUp from "../../modules/authen/sign-up/SignUp";
import { PublicStack } from "../types";

const FuncComponent = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PublicStack.Screen name={"calendar"} component={CalendarScreen} />
      <PublicStack.Screen component={SignIn} name="signIp" />
      <PublicStack.Screen component={SignUp} name="signUp" />
    </PublicStack.Navigator>
  );
};

export default FuncComponent;
