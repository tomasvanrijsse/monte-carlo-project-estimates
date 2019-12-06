<template>
    <v-layout column>
        <v-row>
            <v-col cols="12" md="6">
                <TaskList></TaskList>
            </v-col>
            <v-col cols="12" md="6">
                <Graph></Graph>
            </v-col>
        </v-row>
    </v-layout>
</template>

<script>
    import TaskList from '~/components/TaskList';
    import Graph from "../components/Graph";

    export default {
        components: {
            TaskList,
            Graph
        }
    }
</script>
