<template>
    <el-table
        highlight-current-row
        strpe
        :height="height"
        :data="tableData"
        style="width: 100%;"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        :cell-style="{paddingTop: '4px', paddingBottom: '4px'}"
    >
        <el-table-column
            label="变量名"
            width="300">
            <template slot-scope="scope">
                <el-input clearable v-model="scope.row.key" placeholder="接收抽取值后的变量名"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            label="抽取表达式"
            width="420">
            <template slot-scope="scope">
                <el-input clearable v-model="scope.row.value" placeholder="抽取表达式"></el-input>

            </template>
        </el-table-column>

        <el-table-column
            label="描述"
            width="200">
            <template slot-scope="scope">
                <el-input clearable v-model="scope.row.desc" placeholder="抽取值简要描述"></el-input>
            </template>
        </el-table-column>

        <el-table-column>
            <template slot-scope="scope">
                <el-row v-show="scope.row === currentRow">
                    <el-button
                        icon="el-icon-circle-plus-outline"
                        size="mini"
                        type="info"
                        @click="handleEdit(scope.$index, scope.row)">
                    </el-button>

                    <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="danger"
                        v-show="scope.$index !== 0"
                        @click="handleDelete(scope.$index, scope.row)">
                    </el-button>
                </el-row>

            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    export default {
        props: {
            save: Boolean,
            extract: {
                require: false
            }
        },
        computed:{
            height() {
                return window.screen.height - 440
            }
        },
        watch: {
            save: function () {
                this.$emit('extract', this.parseExtract(), this.tableData);
            },
            extract: function () {
                if (this.extract.length !== 0) {
                    this.tableData = this.extract;
                }
            }
        },

        methods: {
            cellMouseEnter(row) {
                this.currentRow = row;
            },

            cellMouseLeave(row) {
                this.currentRow = '';
            },

            handleEdit(index, row) {
                this.tableData.push({
                    key: '',
                    value: '',
                    desc: ''
                });
            },

            handleDelete(index, row) {
                this.tableData.splice(index, 1);
            },
            // 抽取格式化
            parseExtract() {
                let extract = {
                    extract: [],
                    desc: {}
                };
                for (let content of this.tableData) {
                    const key = content['key'] ;
                    const value = content['value'];
                    if (key !== '' && value !== '') {
                        let obj = {};
                        obj[key] = value;
                        extract.extract.push(obj);
                        extract.desc[key] = content['desc'];
                    }
                }
                return extract;
            }
        },

        data() {
            return {
                currentRow: '',
                tableData: [{
                    key: '',
                    value: '',
                    desc: ''
                }]
            }
        },
        name: "Extract"
    }
</script>

<style scoped>
</style>
