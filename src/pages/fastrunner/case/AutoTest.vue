<template>

    <el-container>
        <el-header style="background: #fff; padding: 0; height: 50px">
            <div class="nav-api-header">
                <div style="padding-top: 10px; margin-left: 10px">
                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-circle-plus"
                        @click="dialogVisible = true"
                        :disabled="!addTestActivate"
                    >
                        新建分组
                    </el-button>

                    <el-dialog
                        title="新建分组"
                        :visible.sync="dialogVisible"
                        width="30%"
                        align="center"
                    >
                        <el-form
                            :model="nodeForm"
                            :rules="rules"
                            ref="nodeForm"
                            label-width="100px"
                            class="project">
                            <el-form-item label="节点名称" prop="name">
                                <el-input v-model="nodeForm.name"></el-input>
                            </el-form-item>
                        </el-form>

                        <el-radio-group v-model="radio" size="small">
                            <el-radio-button label="根节点"></el-radio-button>
                            <el-radio-button label="子节点"></el-radio-button>
                        </el-radio-group>

                        <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="handleConfirm('nodeForm')">确 定</el-button>
                      </span>
                    </el-dialog>

                    <el-button
                        type="danger"
                        size="small"
                        icon="el-icon-delete"
                        @click="deleteNode"
                        :disabled="buttonActivate"
                    >删除分组
                    </el-button>

                    <el-button
                        :disabled="currentNode === '' "
                        type="info"
                        size="small"
                        icon="el-icon-edit-outline"
                        @click="renameNode"
                    >重命名
                    </el-button>

                    <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-circle-plus-outline"
                        @click="buttonActivate=false"
                        :disabled="buttonActivate"
                    >添加用例
                    </el-button>
                    &nbsp环境:
                    <el-select
                        placeholder="请选择"
                        size="small"
                        tyle="margin-left: -6px"
                        v-model="currentHost"
                    >
                        <el-option
                            v-for="item in hostOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                    &nbsp配置:
                    <el-select
                        placeholder="请选择"
                        size="small"
                        tyle="margin-left: -6px"
                        v-model="currentConfig"
                        :disabled="addTestActivate"
                    >
                        <el-option
                            v-for="item in configOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>


                    <el-button
                        v-if="addTestActivate"
                        style="margin-left: 20px"
                        type="primary"
                        icon="el-icon-caret-right"
                        circle
                        size="mini"
                        @click="run = !run"
                    ></el-button>

                    <el-button
                        v-if="addTestActivate"
                        style="margin-left: 20px"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                        size="mini"
                        @click="del = !del"
                    ></el-button>

                    <el-button
                        :disabled="addTestActivate"
                        type="text"
                        style="position: absolute; right: 30px;"
                        @click="handleBackList"
                    >返回列表
                    </el-button>

                </div>
            </div>
        </el-header>

        <el-container>
            <el-aside
                style="margin-top: 10px;"
                v-show="addTestActivate"
            >
                <div class="nav-api-side">
                    <div class="api-tree">
                        <el-input
                            placeholder="输入关键字进行过滤"
                            v-model="filterText"
                            size="medium"
                            clearable
                            prefix-icon="el-icon-search"
                        >
                        </el-input>

                        <el-tree
                            @node-click="handleNodeClick"
                            :data="dataTree"
                            node-key="id"
                            :default-expand-all="false"
                            :expand-on-click-node="false"
                            draggable
                            highlight-current
                            :filter-node-method="filterNode"
                            ref="tree2"
                            @node-drag-end="handleDragEnd"
                        >
                            <span class="custom-tree-node"
                                  slot-scope="{ node, data }"
                            >
                                <span><i class="iconfont" v-html="expand"></i>&nbsp;&nbsp;{{ node.label }}</span>
                            </span>
                        </el-tree>

                    </div>
                </div>


            </el-aside>

            <el-main style="padding: 0;">
                <test-list
                    v-show="addTestActivate"
                    :project="$route.params.id"
                    :node="currentNode !== '' ? currentNode.id : '' "
                    :del="del"
                    v-on:testStep="handleTestStep"
                    :back="back"
                    :run="run"
                    :host="currentHost"
                >
                </test-list>

                <edit-test
                    :back="back"
                    v-show="!addTestActivate"
                    :project="$route.params.id"
                    :node="currentNode.id"
                    :testStepResp="testStepResp"
                    :config="currentConfig"
                    :host="currentHost"
                    v-on:addSuccess="handleBackList"
                >
                </edit-test>

            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    import EditTest from './components/EditTest'
    import TestList from './components/TestList'

    export default {
        computed: {
            buttonActivate: {
                get: function () {
                    return !this.addTestActivate || this.currentNode === '';
                },
                set: function (value) {
                    this.addTestActivate = value;
                    this.testStepResp = [];
                }
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        components: {
            EditTest,
            TestList,
        },
        data() {
            return {
                testStepResp: [],
                nodeForm: {
                    name: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入节点名称', trigger: 'blur'},
                        {min: 1, max: 50, message: '最多不超过50个字符', trigger: 'blur'}
                    ]
                },
                hostOptions:[],
                back: false,
                del: false,
                run: false,
                radio: '根节点',
                addTestActivate: true,
                currentConfig: '请选择',
                currentHost:'请选择',
                treeId: '',
                maxId: '',
                dialogVisible: false,
                currentNode: '',
                data: '',
                filterText: '',
                expand: '&#xe65f;',
                dataTree: [],
                configOptions: []
            }
        },
        methods: {
            handleDragEnd() {
                this.updateTree(false);
            },
            getConfig() {
                this.$api.getAllConfig(this.$route.params.id).then(resp => {
                    this.configOptions = resp;
                    this.configOptions.push({
                        name: '请选择'
                    })
                })
            },

            handleBackList() {
                this.addTestActivate = true;
                this.back = !this.back;
            },

            handleTestStep(resp) {
                this.testStepResp = resp;
                this.addTestActivate = false;
            },
            getTree() {
                this.$api.getTree(this.$route.params.id, {params: {type: 2}}).then(resp => {
                    this.dataTree = resp['tree'];
                    this.treeId = resp['id'];
                    this.maxId = resp['max'];
                })
            },

            updateTree(mode) {
                this.$api.updateTree(this.treeId, {
                    mode: mode,
                    body: this.dataTree,
                    node: this.currentNode.id,
                    type: 2
                }).then(resp => {
                    if (resp['success']) {
                        this.dataTree = resp['tree'];
                        this.maxId = resp['max'];
                    } else {
                        this.$message.error(resp['msg']);
                    }
                })
            },
            renameNode() {
                this.$prompt('请输入节点名', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /\S/,
                    inputErrorMessage: '节点名称不能为空'
                }).then(({value}) => {
                    const parent = this.data.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === this.currentNode.id);
                    children[index]["label"] = value
                    this.updateTree(false);
                });
            },

            deleteNode() {
                this.$confirm('此操作将永久删除该节点下所有用例, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if (this.currentNode === '') {
                        this.$message.info('请选择一个节点');
                    } else {
                        if (this.currentNode.children.length !== 0) {
                            this.$message.warning('此节点有子节点，不可删除！');
                        } else {
                            this.remove(this.currentNode, this.data);
                            this.updateTree(true);
                        }
                    }

                })
            },

            handleConfirm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.append(this.currentNode);
                        this.updateTree(false);
                        this.dialogVisible = false;
                    }
                });
            },

            handleNodeClick(node, data) {
                this.currentNode = node;
                this.data = data;
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },

            remove(data, node) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            append(data) {
                const newChild = {id: ++this.maxId, label: this.nodeForm.name, children: []};
                if (data === '' || this.dataTree.length === 0 || this.radio === '根节点') {
                    this.dataTree.push(newChild);
                    return
                }
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            getHost() {
                this.$api.getAllHost(this.$route.params.id).then(resp => {
                    this.hostOptions = resp;
                    this.hostOptions.push({
                        name: '请选择'
                    })
                })
            },

        },
        name: "AutoTest",
        mounted() {
            this.getTree();
            this.getConfig();
            this.getHost();
        }
    }
</script>

<style scoped>


</style>
