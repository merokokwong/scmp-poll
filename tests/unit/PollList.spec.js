import { expect } from "chai";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import PollList from "@/components/PollList.vue";
import store from "@/store.js";

describe("PollList.vue", () => {
  const localVue = createLocalVue();
  const wrapper = shallowMount(PollList, {
    localVue,
    store
  });

  let option = [
    { id: 1, label: "Yes", vote: 9 },
    { id: 2, label: "No", vote: 1 }
  ];

  it("totalVote", () => {
    let totalVote = wrapper.vm.totalVote(option);
    expect(totalVote).to.be.equal(10);
  });

  it("findOptionColor", () => {
    let colors = wrapper.vm.findOptionColor(0);
    expect(colors).to.be.equal("#008FFB");
  });

  it("getLabels", () => {
    let lables = wrapper.vm.getLabels(option);
    expect(lables).to.be.eql(["Yes", "No"]);
  });

  it("getSeries", () => {
    let series = wrapper.vm.getSeries(option);
    expect(series).to.be.eql([9, 1]);
  });

  it("unixToDate", () => {
    let unixD = 1516605447;
    let date = wrapper.vm.unixToDate(unixD);
    expect(date).to.be.equal("2018-01-22");
  });

  it("addVote", () => {
    //store.state.polls[0].answer.options[0].vote is the test Object
    //default state is 0
    wrapper.vm.addVote(1, 1);
    expect(store.state.polls[0].answer.options[0].vote).to.be.equal(1);
  });
});
