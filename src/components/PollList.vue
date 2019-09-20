<template>
  <div class="poll-list">
    <div class="poll" v-for="poll in polls" :key="poll.id">
      <div class="poll-date">
        {{ unixToDate(poll.publishedDate) }}
      </div>
      <h2>{{ poll.title }}</h2>
      <div class="poll-result">
        <div class="poll-answer">
          <div>
            Options:
          </div>
          <button
            class="answer-option"
            v-for="(opt, index) in poll.answer.options"
            :key="opt.id"
            @click="addVote(poll.id, opt.id)"
            :style="{ 'background-color': findOptionColor(index) }"
          >
            {{ opt.label }}
          </button>
          <div class="total-vote" v-if="totalVote(poll.answer.options) > 0">
            Total Vote: {{ totalVote(poll.answer.options) }}
          </div>
        </div>
        <apexchart
          v-if="totalVote(poll.answer.options) > 0"
          type="donut"
          :width="300"
          :options="chartOptions(poll.answer.options)"
          :series="getSeries(poll.answer.options)"
        ></apexchart>
        <div v-else class="no-vote">
          There's no one vote for this poll yet. <br />
          Be the first to vote!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "../store.js";

const colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#3F51B5"
];

export default {
  name: "PollList",
  components: {},
  data() {
    return {};
  },
  computed: {
    polls() {
      return this.$store.state.polls;
    }
  },
  beforeCreate() {
    store.commit("fetchPolls");
  },
  methods: {
    totalVote(option) {
      let totalVote = 0;
      for (var i = 0; i < option.length; i++) {
        totalVote = totalVote + option[i].vote;
      }
      return totalVote;
    },
    findOptionColor(index) {
      return colors[index];
    },
    chartOptions(option) {
      let labels = this.getLabels(option);
      let chartOptions = {
        labels: labels,
        colors: colors,
        responsive: [
          {
            options: {
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };
      return chartOptions;
    },
    getLabels(option) {
      let labels = [];
      for (var i = 0; i < option.length; i++) {
        labels.push(option[i].label);
      }
      return labels;
    },
    getSeries(option) {
      let series = [];
      for (var i = 0; i < option.length; i++) {
        series.push(option[i].vote);
      }
      return series;
    },
    unixToDate(unixD) {
      return moment.unix(unixD).format("YYYY-MM-DD");
    },
    addVote(pollId, optId) {
      store.commit("addVote", { pollId, optId });
    }
  }
};
</script>
