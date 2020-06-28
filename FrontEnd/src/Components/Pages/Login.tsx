import React, { useState, useEffect } from "react";
import "antd/es";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  message,
  Divider,
  Card,
} from "antd/es";
import {
  fetch_API,
  Methods,
  UseErrorHandler,
  DEFAULT_USER_AUTH,
  TIME_OUT,
} from "../../util";
import { Message } from "../Global/Message";
import { MessageType } from "../Global/types";
import { authContext } from "../contexts/AuthContext";
import { getStoredUserAuth } from "../../util/Helper";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import { TIMEOUT } from "dns";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export function Login() {
  const [username, setUserName] = useState("");
  const [password, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const { error, showError } = UseErrorHandler(null);
  const [isNetError, setNetError] = useState(false);
  const [isTokenError, setTokenError] = useState(false);
  const auth = React.useContext(authContext);
  const URL = "http://localhost:4020/v1/auth/session";
  const REG = "http://localhost:4020/v1/auth/register";
  const TOKEN = "http://localhost:4020/v1/auth/token";

  const authHandler = async () => {
    setLoading(true);

    try {
      const userData: any = await Promise.race([
        fetch_API(URL, Methods.post, {
          username,
          password,
        }),
        new Promise((resolve, reject) => {
          setTimeout(resolve, TIME_OUT, "TimeOut");
        }),
      ]);
      //setSuccess(true);
      message.success("success");
      await auth.setAuthStatus({ user: username, token: userData.token });
      setLoading(false);
      setLogin(true);
      setTokenError(false);
    } catch (err) {
      setTokenError(true);
      setLogin(false);
      //setLoading(false);
      console.log(err);
      if (err.status === 422) {
        //showError("UserName or Password Error");
        message.error("UserName or Password Error");
      } else {
        //showError("Network Error");
        message.error("Network Error");
      }
      setLoading(false);
    }
  };

  const regHandler = async () => {
    setLoading(true);
    try {
      await Promise.race([
        fetch_API(REG, Methods.post, {
          username,
          password,
        }),
        new Promise((resolve, reject) => {
          setTimeout(resolve, TIME_OUT, "TimeOut");
        }),
      ]);
      //setSuccess(true);
      message.success("success signed up");
      setIsSignUp(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.status === 422) {
        message.error("Invalid UserName or Password");
      } else {
        message.error("Network Error");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await Promise.race([
          fetch_API(TOKEN, Methods.get, undefined, getStoredUserAuth().token),
          new Promise((resolve, reject) => {
            setTimeout(resolve, TIME_OUT, "TimeOut");
          }),
        ]);
        setTokenError(false);
      } catch (err) {
        setTokenError(true);
      }
    };
    fetchToken();
  }, []);

  const [isSignUp, setIsSignUp] = useState(false);

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 7 },
  };

  const tailLayout = {
    labelCol: { span: 10 },
    wrapperCol: { offset: 10, span: 7 },
  };

  const onSignInFinish = (values: any) => {
    authHandler();
  };

  const onSignUpFinish = (values: any) => {
    regHandler();
  };

  const onFinishFailed = (err: any) => {
    setLoading(false);
    showError(err);
  };

  const redirect = () => {
    if (!isTokenError && login) {
      console.log("im in");
      return <Redirect to="/todo" />;
    }
  };

  const showSignin = () => {
    return (
      <div>
        <Divider>Sign In</Divider>
        <br />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onSignInFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            {/* <a className="login-form-forgot" href="">
        Forgot password
      </a> */}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
            <br />
            Or{" "}
            <a
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              register now!
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const showSignUp = () => {
    return (
      <div>
        <Divider>Sign Up</Divider>
        <br />
        <Form
          {...layout}
          name="register"
          onFinish={onSignUpFinish}
          onFinishFailed={onFinishFailed}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="UserName"
            rules={[
              {
                required: true,
                message: "Please input your UserName!",
              },
            ]}
          >
            <Input onChange={(e) => setUserName(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password onChange={(e) => setUserPassword(e.target.value)} />
          </Form.Item>
          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[{ required: true, message: 'Please input the captcha you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Form.Item> */}
          {/* <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <br />
          Or{" "}
          <a
            onClick={() => {
              setIsSignUp(false);
            }}
          >
            Sign in!
          </a>
        </Form>
      </div>
    );
  };

  return (
    <div
      style={{
        background: "rgb(238, 238, 238)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: " center",
      }}
    >
      {redirect()}
      <Card
        style={{
          width: "30%",
          height: "55%",
          minWidth: "500px",
          minHeight: "500px",
        }}
      >
        {!isSignUp ? showSignin() : showSignUp()}
      </Card>
    </div>
  );
}
