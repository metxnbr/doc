# git-doc

对于一些不是很常用的命令, 有时却又很需要它时, 忘了, 怎么办? 搜索资料, 临时尝试结果...

你某一次搜索到一篇很好, 很详细的某项命令资料, 下次你再去茫茫网络, 不一定就能碰到了.

在开发中被打断, 而且还要把项目当草稿, 感觉不妥, 所以下面会根据场景收集下git命令, 太常用的不作介绍. **把最好的, 最准确的记录在这里, 下次来还是最好的, 最准确的**

`git rebase origin` (tracking branch of origin) First, rewinding head to replay your work on top of it...
Applying: local commit

> 场景: 需要将当前分支(a)名叫`add feature`的commit以最新的提交至最新开发分支(dev)上, 但a不确定是否落后dev, 这时可以使用以上命令, 它会先将`add feature`临时移至顶部, 然后将`a`分支同步更新为`dev`分支, 最后在顶部保存`add feature`的commit. 本地dev可能不是最新的时, 你需要与线上的dev合并, 这时就得`git rebase origin/dev`
---
`git merge --squash branch`

> 场景: 在实际项目开发中因为调式, 反复修改, 测试, 会在当前分支上产生很多琐碎提交, 测试无误完成后, 其实就一个功能, 但普通合并至主开发分支上,会在主开发分支上产生很多无意义的琐碎提交, **我们需要用一个新的commit总结这个分支完成的修改**. 这时可以使用squash方式合并, 它会把branch中的所有新`commit`的修改, add 到`staged changes`, **这里的merge不会自动commit, 接着你还要`git commit -m 'new message'`**, 这样合并branch后, 只会添加一个名叫`new message`的commit.  
btw, 其实琐碎提交是有必要的, 随时备份你的进度, 有节奏的进行开发.
---
waitting...
