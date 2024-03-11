'use strict';
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// 从路径中提取模型名称
const getModelNameFromPath = (routePath) => {
    // 在这里根据你的路由规则提取模型名称
    // 例如，如果路由路径为 "/api/users"，提取的模型名称可能为 "User"
    const segments = routePath.split('/').filter(Boolean);
    if (segments.length > 1) {
        return segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }

    return null;
};
// 自动加载模型的中间件
const autoModels = async (ctx, next) => {
    const modelName = getModelNameFromPath(ctx.path);
    if (modelName) {
        // 使用模型名称获取模型
        ctx.model = mongoose.model(modelName);
    }

    await next();
};

module.exports = autoModels;
