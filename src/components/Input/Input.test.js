import React from "react";
import { shallow, mount, render } from "enzyme";
import Input from "./Input";
import { Button, TextField } from "@material-ui/core";

describe("Input component tests", () => {
  let Wrapper;
  beforeEach(() => {
    Wrapper = shallow(<Input />);
  });

  it("Should have 1 TextField component and 1 Button", () => {
    expect(Wrapper.find(TextField).length).toBe(1);
    expect(Wrapper.find(Button).length).toBe(1);
  });
});
