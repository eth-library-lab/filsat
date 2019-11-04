export declare class FilsatGithub {
    private githubToken;
    private githubApiV3;
    private githubApiV4;
    private workingDirectory;
    private branchName;
    private fileName;
    private message;
    createPR(pathname: string, taskId: string, docContent: string): Promise<void>;
    private forkRepo;
    private clone;
    private deleteDir;
    private createDocumentationContentFile;
    private add;
    private commit;
    private createBranch;
    private push;
    private createPullRequest;
}
