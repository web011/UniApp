<template>
    <div>
        <h1 class="mb-5 mt-5 ml-4">{{id ? '修改' : '添加'}}轮播图</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="图片">
                <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="afterUpload"
                >
                    <img v-if="model.url" :src="model.url" class="avatar" alt="">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{
        id:{type:String}
    },
    data(){
        return {
            model:{}
        }
    },
    methods:{
        afterUpload(res){
            this.$set(this.model,'url',res.url);
            console.log(this.model)
        },
        async save(){
            let res
            if(this.id){
                res = await this.$http.put(`rest/swiper/${this.id}`,this.model);
                this.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.$router.push('/children/swiperlist')
            }else{
                if(this.model.url === undefined){
                    this.$message({
                        type:'error',
                        message:'数据不能为空'
                    })
                }else{
                    res= await this.$http.post('rest/swiper',this.model);
                    this.$router.push('/children/swiperlist')
                    this.$message({
                        type:'success',
                        message:'保存成功'
                    })
                }
            }
        },
        async fetch(){
            const res = await this.$http.get(`rest/swiper/${this.id}`);
            this.model = res.data;
        }
    },
    created(){
        this.id && this.fetch()
    }
}
</script>