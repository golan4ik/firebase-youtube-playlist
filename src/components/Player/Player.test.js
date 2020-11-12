import React from "react";
import { shallow, mount, render } from "enzyme";
import Player from "./Player";
import YouTube from "react-youtube";

describe("Player component tests", () => {
  let Wrapper;
  beforeEach(() => {
    Wrapper = shallow(<Player />);
  });

  it("Should render", () => {
    expect(Wrapper.exists()).toBeTruthy();
  });

  it("Should NOT contain react-youtube component on mount", () => {
    expect(Wrapper.find(YouTube).exists()).toBeFalsy();
  });

  it("Should contain placeholder div on mount", () => {
    expect(Wrapper.find(".placeholder").exists()).toBeTruthy();
  });
});
