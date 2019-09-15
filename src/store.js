import Vue from "vue";
import Vuex from "vuex";
import data from "@/assets/poll.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    polls: []
  },
  mutations: {
    addVote(state, { pollId, optId }) {
      //use pollId and optId to get the Object
      let pollObj = state.polls.find(obj => obj.id === pollId);
      let optionsArray = pollObj.answer.options;
      let optObj = optionsArray.find(obj => obj.id === optId);
      optObj.vote++;

      //replace pollObj in state.polls
      let foundIndex = state.polls.indexOf(pollObj);
      state.polls.splice(foundIndex, 1, pollObj);
    },
    fetchPolls(state) {
      // before store poll data into store,
      // add :key "vote" to each options
      let originJSON = data.polls;

      for (var i = 0; i < originJSON.length; i++) {
        let arrayOfOption = originJSON[i].answer.options;
        let newOpt = arrayOfOption.map(function(el) {
          var opt = Object.assign({}, el);
          opt.vote = 0;
          return opt;
        });
        originJSON[i].answer.options = newOpt;
      }

      state.polls = originJSON;
    }
  },
  actions: {},
  getters: {}
});
