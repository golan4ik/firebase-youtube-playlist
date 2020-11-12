import React from "react";
import { shallow, mount, render } from "enzyme";
import Playlist from "./Playlist";
import List from "@material-ui/core/List";
import Input from "../Input/Input";

describe("Playlist component tests", () => {
  let Wrapper;
  beforeEach(() => {
    Wrapper = shallow(<Playlist />);
  });

  it("Should render", () => {
    expect(Wrapper.exists()).toBeTruthy();
  });

  it("Should contain Input and List components on mount", () => {
    expect(Wrapper.find(Input).exists()).toBeTruthy();
    expect(Wrapper.find(List).exists()).toBeTruthy();
  });
});
