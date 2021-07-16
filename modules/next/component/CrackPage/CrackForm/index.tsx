import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import ImgInput from "@/component/form/ImgInput";
import BlackButton from "@/component/buttons/BlackButton";

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (max-width: 865px) {
  }
  > :not(:first-child) {
    margin-top: 10px;
  }
  > :not(:last-child) {
  }
  width: 100%;
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

export default function CrackForm({}) {
  const router = useRouter();

  const [formData, setFromData] = useState({
    file: null,
  });
  const [errors, setErrors] = useState<any>();

  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const handlePaste = (e) => {
    const file = e.clipboardData.files[0];
    if (file) {
      console.log("paste", file);
      setFromData({ ...formData, file });
      setErrors(null);
    }
  };
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  });
  //
  const onClick = () => {};

  return (
    <Wrapper onSubmit={onSubmit}>
      <ImgInput
        placeholder={"用户名"}
        name={"username"}
        onChange={null}
        error={null}
        value={null}
      />
      <ButtonWrapper>
        <BlackButton text={"提交识图"} onClick={onClick} />
      </ButtonWrapper>
    </Wrapper>
  );
}
