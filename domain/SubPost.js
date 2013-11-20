var uid = require("node-uuid").v1,
    Emit = require("events").EventEmitter,
    check = require('validator').check,
    inherits = require("util").inherits;

function wrap(my){

    var emitUpdate = require("./emitUpdate")("SubPost",my);

    // options:{title,body,authorId,parentId}
    function SubPost(options){
        this._id = uid();
        this._title = options.title;
        this._body = options.body;
        this._authorId = options.authorId;
        this._parentId = options.parentId;
        this._updateTime =
        this._createTime = Date.now();
    }

    inherits(SubPost,Emit);

    var proto = Post.prototype;

    proto.updateInfo = function(title,body){

        check(title).len(3, 18);
        check(body).len(5,1000);

        this._title = title;
        this._body = body;
        var fieldNames = ["title","updateTime","body"];
        emitUpdate(this,fieldNames);

    }

    SubPost.className = "SubPost";

    return SubPost;
}
