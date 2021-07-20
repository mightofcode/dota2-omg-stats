import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import * as React from "react";
import ImgInput from "@/component/form/ImgInput";
import BlackButton from "@/component/buttons/BlackButton";
import { postApi, postFile } from "@/services/nextApi";
import Loading from "@/component/CrackPage/CrackForm/Loading";
import LoadingDiv from "@/component/CrackPage/CrackForm/LoadingDiv";
import Divider from "@/component/util/divider";

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
const PreviewImg = styled.img`
  max-width: 100%;
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  color: #8b8b8b;
`;

export default function CrackForm({ setCrackResult }) {
  const router = useRouter();

  const [formData, setFromData] = useState({
    file: null,
    filename: null,
  });
  const [errors, setErrors] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState<string>(null);

  const handleChange = (e) => {
    if (e.target.name == "file") {
      const file = e.target.files[0];

      setFromData({ ...formData, filename: e.target.value, file });
      setErrors(null);
      console.log(e.target.files[0]);
      if (file) {
        const pasteImg = URL.createObjectURL(file);
        console.log(pasteImg);
        setPreviewImg(pasteImg);
      } else {
        setPreviewImg(null);
      }
    } else {
      setFromData({ ...formData, [e.target.name]: e.target.value });
      setErrors(null);
    }
  };
  useEffect(() => {}, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCrackResult(null);
    const res = await postFile("/api/crack", formData);
    setLoading(false);
    if (res.result) {
      setErrors(null);
      setCrackResult(res.result);
    } else {
      setErrors(res.error);
    }
  };

  const handlePaste = async (e) => {
    const file = e.clipboardData.files[0];
    if (file) {
      console.log("paste", file, file.name, formData);
      setFromData({ ...formData, filename: file.name, file });
      setErrors(null);
      const pasteImg = URL.createObjectURL(file);
      console.log(pasteImg);
      setPreviewImg(pasteImg);
    }
  };
  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  });

  return (
    <Wrapper onSubmit={onSubmit}>
      <ImgInput
        placeholder={"用户名"}
        name={"file"}
        onChange={handleChange}
        error={errors?.data?.file}
        value={formData?.filename}
      />
      <Text>游戏内截图后直接粘贴</Text>
      <Divider height={"20px"} />
      {previewImg && <PreviewImg src={previewImg} />}

      <ButtonWrapper>
        <BlackButton text={"提交识图"} onClick={null} />
      </ButtonWrapper>

      {loading && <LoadingDiv />}
    </Wrapper>
  );
}
