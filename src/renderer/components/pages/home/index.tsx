import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

const Home = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">欢迎使用</h1>
        <p className="text-muted-foreground">
          这是一个基于 Electron + React + TypeScript 的桌面应用程序
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>现代化技术栈</CardTitle>
            <CardDescription>使用最新的前端技术</CardDescription>
          </CardHeader>
          <CardContent>
            <p>React 18 + TypeScript + Tailwind CSS + shadcn/ui</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>优雅的设计</CardTitle>
            <CardDescription>精心设计的用户界面</CardDescription>
          </CardHeader>
          <CardContent>
            <p>遵循现代设计原则，提供流畅的用户体验</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>功能丰富</CardTitle>
            <CardDescription>强大的功能支持</CardDescription>
          </CardHeader>
          <CardContent>
            <p>集成了多种实用功能，满足各种使用需求</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home; 