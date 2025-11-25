import Button from "@/src/components/Button";
import ScreenView from "@/src/components/ScreenView";
import Stepper from "@/src/components/Stepper";
import { useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import RegisterBasic from "./components/registerBasic";
import RegisterPersonal from "./components/registerPersonal";
import RegisterReview from "./components/registerReview";
import RegisterSuccess from "./components/registerSuccess";

const Register = () => {
  const pagerRef = useRef<PagerView>(null);

  const [email, setEmail] = useState("p@test.com");
  const [password, setPassword] = useState("Password123");
  const [passwordVerify, setPasswordVerify] = useState("Password123");

  const [name, setName] = useState("Palak");
  const [lastName, setLastName] = useState("Bakshi");
  const [age, setAge] = useState("21");
  const [weight, setWeight] = useState(58);
  const [height, setHeight] = useState(163);
  const [gender, setGender] = useState("female");

  const [activeStep, setActiveStep] = useState(0);

  const handleRegisterButtonPress = () => {
    pagerRef.current?.setPage(3);
    setActiveStep(3);
  };

  return (
    <ScreenView scrollable={false} padding>
      <PagerView
        ref={pagerRef}
        initialPage={0}
        style={{ flex: 1 }}
        onPageSelected={(e) => setActiveStep(e.nativeEvent.position)}
      >
        <View key={0}>
          <RegisterBasic
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVerify={passwordVerify}
            setPasswordVerify={setPasswordVerify}
            passwordErrors={{
              length: "satisfied",
              uppercase: "satisfied",
              lowercase: "satisfied",
              match: "satisfied",
              validEmail: "satisfied",
            }}
          />
        </View>

        <View key={1}>
          <RegisterPersonal
            name={name}
            lastName={lastName}
            age={age}
            weight={weight}
            height={height}
            gender={gender}
            onChangeName={setName}
            onChangeLastName={setLastName}
            onAgeChange={setAge}
            onChangeWeight={setWeight}
            onChangeHeight={setHeight}
            onChangeGender={setGender}
          />
        </View>

        <View key={2}>
          <RegisterReview name={name} lastName={lastName} />
        </View>

        <View key={3}>
          <RegisterSuccess />
        </View>
      </PagerView>

      {activeStep < 3 && (
        <View className="items-center justify-end pb-8">
          <Stepper steps={["Account", "Personal", "Review"]} activeStep={activeStep} />

          <Button
            label={activeStep === 2 ? "Register" : "Next"}
            onPress={() => {
              if (activeStep < 2) {
                pagerRef.current?.setPage(activeStep + 1);
                setActiveStep(activeStep + 1);
              } else {
                handleRegisterButtonPress();
              }
            }}
          />
        </View>
      )}
    </ScreenView>
  );
};

export default Register;
