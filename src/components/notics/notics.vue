<template>
    <section>
        <div class="notics">
            <Tabs value="all" :animated="false">
                <div v-for="(item,index) in operateOption" :key="index">
                    <TabPane :label="item.name" :name="item.type">
                        <div class="tabListContent">
                            <List item-layout="vertical">
                                <router-link to="/notics/noticsDetail">
                                    <ListItem v-for="item in contentData" :key="item.title">
                                        <ListItemMeta :title="item.title" />
                                        <div class="mainContent">
                                            <span>{{item.description}}</span>
                                            <span> {{ item.content }}</span>
                                        </div>
                                        <template slot="extra">
                                            <li>
                                                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                            </li>
                                            <li>
                                                <el-button type="danger" icon="el-icon-delete" circle>
                                                </el-button>
                                            </li>
                                        </template>
                                    </ListItem>
                                </router-link>

                            </List>

                        </div>
                    </TabPane>
                </div>
                <Button class="sendBulletin" icon="ios-paper-plane-outline" size="small" slot="extra"
                    @click="sendBulletin">发公告</Button>
            </Tabs>
        </div>
    </section>
</template>
<script>
    export default {
        name: 'notics',
        data() {
            return {
                isnoticsList: true,
                operateOption: [{
                    'name': '全部',
                    'type': 'all'
                }, {
                    'name': '升级通知',
                    'type': 'upgrade'
                }, {
                    'name': '公告',
                    'type': 'bulletin'
                }],
                contentData: [{
                        title: 'This is title 1',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 2',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                ]
            }
        },
        methods: {
            sendBulletin() {
                this.$router.push({
                    name: 'bulletinBoard',
                    params: {}
                })
            }
        }
    }
</script>

<style scoped>
    .sendBulletin {
        color: #409EFF;
        font-size: 12px;
        border: 1px solid #409EFF;
        margin-right: 30px;
    }

    .mainContent {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        color: #333;
    }

    .ContentExhibition {
        display: flex;
        width: 80%;
        margin: 0 auto;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }

    .ContentExhibition div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title {
        font-size: 16px;
        color: #333;
        font-weight: 700;
    }

    .time {
        margin: 20px 0;
    }

    .contentVal {
        color: #333;
        font-size: 14px;
    }

    .attachFile {
        display: flex;
        align-content: flex-start;
        width: 80%;
        margin: 0 auto;
        padding-top: 40px;
        font-size: 13px;
    }

    .attachFile .topic {
        color: #333;
    }

    .attachFile .downloadList {
        padding-bottom: 5px;
    }

    .attachFile .downloadList a {
        margin-right: 20px;

    }
</style>