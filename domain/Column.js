var uid = require("node-uuid").v1,
    createModel = require("model-brighthas");


module.exports = wrap;

function wrap(my) {

    var Column = createModel("Column")
        .attr('id',{default:uid(),readonly:true})
        .attr("name", {
            type: "string",
            required: true
        })
        .attr("top_", {
            type: "boolean",
            default: false
        })
        .attr("accessNum", {
            type: "number",
            default: 0
        })
        .attr("updateTime", {
            type: "date"
        })
        .attr("createTime", {
            type: "date"
        })
        .attr("des")

    .on("creating", function(column) {
        column.attrs.createTime = column.attrs.updateTime = new Date();
    })
	
	.on("changing",function(column,attrs){
		attrs.updateTime = new Date;
	})

    .on("changed", function(column, attrs) {
        my.publish("*.*.update", "Column", column.id, column.toJSON());
    })

    .method("up", function() {
        this.updateTime = new Date;
    })

    .method("top", function() {
        this.top_ = true;
    })

    .method("untop", function() {
        this.top_ = false;
    })

    .method("access", function(readerId) {
        this.accessNum = this.accessNum + 1;
    })

    .method("updateName", function(name) {
        this.name = name;
        return this.errors;
    })
	
    .method("updateDes", function(des) {
        this.des = des;
        return this.errors;
    })

    .method("updateInfo", function(name, des) {
        this.set({
            name: name,
            des: des
        });
        return this.errors;
    })

    Column.className = "Column";

    return Column;
}
