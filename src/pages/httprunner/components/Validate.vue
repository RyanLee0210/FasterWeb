<template>
    <el-table
        highlight-current-row
        :cell-style="{paddingTop: '4px', paddingBottom: '4px'}"
        strpe
        :height="height"
        :data="tableData"
        style="width: 100%;"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
    >
        <el-table-column
            label="断言类型"
            width="250">
            <template slot-scope="scope">
                <el-tooltip
                    effect="dark"
                    :content="scope.row.comparator"
                    placement="bottom"
                    :disabled="scope.row.comparator === '' ? 'disabled' : false"
                >
                    <el-autocomplete
                        clearable
                        v-model="scope.row.comparator"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入断言类型"
                    >
                    </el-autocomplete>
                </el-tooltip>


            </template>
        </el-table-column>

        <el-table-column
            fixed
            label="实际返回值"
            width="370">
            <template slot-scope="scope">
                <el-input clearable v-model="scope.row.actual" placeholder="实际返回值"></el-input>
            </template>
        </el-table-column>

        <el-table-column
            label="期望类型"
            width="170">
            <template slot-scope="scope">

                <el-select v-model="scope.row.type">
                    <el-option
                        v-for="item in dataTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>

            </template>
        </el-table-column>


        <el-table-column
            label="期望返回值"
            width="400">
            <template slot-scope="scope">
                <el-input clearable v-model="scope.row.expect" placeholder="期望返回值"></el-input>

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
            validate: {
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
                this.$emit('validate', this.parseValidate(), this.tableData);

            },

            validate: function () {
                if (this.validate.length !== 0) {
                    this.tableData = this.validate;
                }
            }
        },

        methods: {
            querySearch(queryString, cb) {
                let validateOptions = this.validateOptions;
                let results = queryString ? validateOptions.filter(this.createFilter(queryString)) : validateOptions;
                cb(results);
            },

            createFilter(queryString) {
                return (validateOptions) => {
                    return (validateOptions.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },

            cellMouseEnter(row) {
                this.currentRow = row;
            },

            cellMouseLeave(row) {
                this.currentRow = '';
            },

            handleEdit(index, row) {
                this.tableData.push({
                    expect: '',
                    actual: '',
                    comparator: 'equals',
                    type: 1
                });
            },

            handleDelete(index, row) {
                this.tableData.splice(index, 1);
            },

            // 类型转换
            parseType(type, value) {
                let tempValue;
                const msg = value + ' => ' + this.dataTypeOptions[type - 1].label + ' 转换异常, 该数据自动剔除';
                switch (type) {
                    case 1:
                        tempValue = value;
                        break;
                    case 2:
                        tempValue = parseInt(value);
                        break;
                    case 3:
                        tempValue = parseFloat(value);
                        break;
                    case 4:
                        if (value === 'False' || value === 'True') {
                            let bool = {
                                'True': true,
                                'False': false
                            };
                            tempValue = bool[value];
                        } else {
                            this.$notify.error({
                                title: '类型转换错误',
                                message: msg,
                                duration: 2000
                            });
                            return 'exception'
                        }
                        break;
                    case 5:
                        try {
                            tempValue = JSON.parse(value);
                        }
                        catch (err) {
                            tempValue = false
                        }
                        break;
                    case 6:
                        try {
                            tempValue = JSON.parse(value);
                        }
                        catch (err) {
                            tempValue = false
                        }
                        break;

                }

                if (tempValue !== 0 && !tempValue && type !== 4 && type !== 1) {
                    this.$notify.error({
                        title: '类型转换错误',
                        message: msg,
                        duration: 2000
                    });
                    return 'exception'
                }
                return tempValue;
            },

            parseValidate() {
                let validate = {
                    validate: []
                };
                for (let content of this.tableData) {
                    if (content['actual'] !== '') {
                        let obj = {};
                        const expect = this.parseType(content['type'], content['expect']);
                        if (expect === 'exception') {
                            continue;
                        }
                        obj[content['comparator']] = [content['actual'], expect];
                        validate.validate.push(obj);
                    }
                }
                return validate;
            }
        },
        data() {
            return {
                currentValidate: '',
                currentRow: '',
                tableData: [{
                    expect: '',
                    actual: '',
                    comparator: 'equals',
                    type: 1
                }],

                dataTypeOptions: [{
                    label: 'String',
                    value: 1
                }, {
                    label: 'Integer',
                    value: 2
                }, {
                    label: 'Float',
                    value: 3
                }, {
                    label: 'Boolean',
                    value: 4
                }, {
                    label: 'List',
                    value: 5
                }, {
                    label: 'Dict',
                    value: 6
                }],

                validateOptions: [{
                    value: 'equals'
                }, {
                    value: 'less_than'
                }, {
                    value: 'less_than_or_equals'
                }, {
                    value: 'greater_than'
                }, {
                    value: 'greater_than_or_equals'
                }, {
                    value: 'not_equals'
                }, {
                    value: 'string_equals'
                }, {
                    value: 'length_equals'
                }, {
                    value: 'length_greater_than'
                }, {
                    value: 'length_greater_than_or_equals'
                }, {
                    value: 'length_less_than'
                }, {
                    value: 'length_less_than_or_equals'
                }, {
                    value: 'contains'
                }, {
                    value: 'contained_by'
                }, {
                    value: 'type_match'
                }, {
                    value: 'regex_match'
                }, {
                    value: 'startswith'
                }, {
                    value: 'endswith'
                }]
            }
        },
        name: "Validate"
    }
</script>

<style scoped>
</style>
