<template>
    <div>
        <div style="margin-left: 200px;">
            <el-radio-group v-model="dataType">
                <el-radio
                    v-for="item of dataOptions"
                    :label="item.label"
                    :key="item.value"
                >{{item.value}}
                </el-radio>
            </el-radio-group>
        </div>
        <div style="margin-top: 5px">
            <el-table
                highlight-current-row
                :cell-style="{paddingTop: '4px', paddingBottom: '4px'}"
                strpe
                :height="height"
                :data="dataType === 'data' ? formData: paramsData"
                style="width: 100%;"
                @cell-mouse-enter="cellMouseEnter"
                @cell-mouse-leave="cellMouseLeave"
                v-show="dataType !== 'json' "
            >
                <el-table-column
                    label="请求Key"
                    width="250">
                    <template slot-scope="scope">
                        <el-input clearable v-model="scope.row.key" placeholder="Key"></el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    v-if="dataType === 'data' "
                    label="类型"
                    width="120">
                    <template slot-scope="scope">

                        <el-select v-model="scope.row.type">
                            <el-option
                                v-for="item in dataTypeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>

                    </template>
                </el-table-column>

                <el-table-column
                    label="请求Value"
                    width="350">
                    <template slot-scope="scope">
                        <el-input
                            v-show="scope.row.type !== 5"
                            clearable
                            v-model="scope.row.value"
                            placeholder="Value"
                        ></el-input>

                        <el-row v-show="scope.row.type === 5">
                            <el-col :span="7">
                                <el-upload
                                    :show-file-list="false"
                                    :action="uploadFile(scope.row)"
                                    :limit="1"
                                    type="small"
                                    :file-list="fileList"
                                    :on-error="uploadError"
                                    :on-success="uploadSuccess"
                                >
                                    <el-button
                                        size="small"
                                        type="primary"
                                        @click="currentIndex=scope.$index"
                                    >选择文件
                                    </el-button>
                                </el-upload>
                            </el-col>

                            <el-col :span="12">
                                <el-badge
                                    :value="scope.row.size"
                                    style="margin-top: 8px"
                                >
                                    <i class="el-icon-document" v-text="scope.row.value"></i>
                                </el-badge>

                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>

                <el-table-column
                    label="描述"
                    width="200">
                    <template slot-scope="scope">
                        <el-input clearable v-model="scope.row.desc" placeholder="参数简要描述"></el-input>
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


            <editor v-model="jsonData"
                    @init="editorInit"
                    lang="json"
                    theme="github"
                    width="100%"
                    :height="height"
                    v-show="dataType === 'json' "
            >
            </editor>

        </div>

    </div>


</template>

<script>
    export default {
        props: {
            save: Boolean,
            request: {
                require: false
            }
        },
        computed:{
            height() {
                return window.screen.height - 464
            }
        },

        name: "Request",
        components: {
            editor: require('vue2-ace-editor'),
        },


        watch: {
            save: function () {
                this.$emit('request', {
                    form: this.parseForm(),
                    json: this.parseJson(),
                    params: this.parseParams(),
                    files: this.parseFile()
                }, {
                    data: this.formData,
                    params: this.paramsData,
                    json_data: this.jsonData
                });
            },

            request: function () {
                if (this.request.length !== 0) {
                    this.formData = this.request.data;
                    this.jsonData = this.request.json_data;
                    this.paramsData = this.request.params;
                }
            }
        },

        methods: {
            editorInit() {
                require('brace/ext/language_tools');
                require('brace/mode/json');
                require('brace/theme/github');
                require('brace/snippets/json');
            },

            uploadSuccess(response, file, fileList) {
                let size = file.size;
                if (size >= 1048576) {
                    size = (size / 1048576).toFixed(2).toString() + 'MB';
                } else if (size >= 1024) {
                    size = (size / 1024).toFixed(2).toString() + 'KB';
                } else {
                    size = size.toString() + 'Byte'
                }
                this.formData[this.currentIndex]['value'] = file.name;
                this.formData[this.currentIndex]['size'] = size;
                this.fileList = [];
                if (!response.success) {
                    this.$message.error(file.name + response.msg);
                }

            },

            uploadFile(row) {
                return this.$api.uploadFile();
            },

            uploadError(error) {
                if (error.status === 401) {
                    this.$router.replace({
                        name: 'Login'
                    })
                } else {
                    this.$message.error('Sorry，文件上传失败啦, 请重试！')
                }
            },

            cellMouseEnter(row) {
                this.currentRow = row;
            },

            cellMouseLeave(row) {
                this.currentRow = '';
            },

            handleEdit(index, row) {
                const data = this.dataType === 'data' ? this.formData : this.paramsData;
                data.push({
                    key: '',
                    value: '',
                    type: 1,
                    desc: ''
                });
            },

            handleDelete(index, row) {
                const data = this.dataType === 'data' ? this.formData : this.paramsData;
                data.splice(index, 1);
            },

            // 文件格式化
            parseFile() {
                let files = {
                    files: {},
                    desc: {}
                };

                for (let content of this.formData) {
                    // 是文件
                    if (content['key'] !== '' && content['type'] === 5) {
                        files.files[content['key']] = content['value'];
                        files.desc[content['key']] = content['desc'];
                    }
                }
                return files
            },

            // 表单格式化
            parseForm() {
                let form = {
                    data: {},
                    desc: {}
                };
                for (let content of this.formData) {
                    // file 不处理
                    if (content['key'] !== '' && content['type'] !== 5) {
                        const value = this.parseType(content['type'], content['value']);

                        if (value === 'exception') {
                            continue;
                        }

                        form.data[content['key']] = value;
                        form.desc[content['key']] = content['desc'];
                    }
                }
                return form;
            },

            parseParams() {
                let params = {
                    params: {},
                    desc: {}
                };
                for (let content of this.paramsData) {
                    if (content['key'] !== '') {
                        params.params[content['key']] = content['value'];
                        params.desc[content['key']] = content['desc'];
                    }
                }
                return params;
            },

            parseJson() {
                let json = {};
                if (this.jsonData !== '') {
                    try {
                        json = JSON.parse(this.jsonData);
                    }
                    catch (err) {
                        this.$notify.error({
                            title: 'json错误',
                            message: '不是标准的json数据格式',
                            duration: 2000
                        });
                    }
                }
                return json;
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
            }
        },

        data() {
            return {
                fileList: [],
                currentIndex: 0,
                currentRow: '',
                jsonData: '',
                formData: [{
                    key: '',
                    value: '',
                    type: 1,
                    desc: ''
                }],
                paramsData: [{
                    key: '',
                    value: '',
                    type: '',
                    desc: ''
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
                    label: 'File',
                    value: 5
                }],

                dataOptions: [{
                    label: 'data',
                    value: '表单',
                }, {
                    label: 'json',
                    value: 'json',
                }, {
                    label: 'params',
                    value: 'params'
                }],
                dataType: 'json'
            }
        }
    }
</script>

<style scoped>
    .ace_editor {
        position: relative;
        overflow: hidden;
        font: 18px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace !important;
        direction: ltr;
        text-align: left;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

</style>
