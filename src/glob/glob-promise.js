// https://github.com/ahmadnassri/glob-promise

const glob = require("glob-promise");

const copyFilesByName = async(source, name) => {
    const files = await glob(path.join(source, name));

    const copyJobs = files.map((file) => {
        return copyFileRelativeToProjectBase(path.relative(source, file));
    });
    await Promise.all(copyJobs);
};

// await glob(path.join(source, name));