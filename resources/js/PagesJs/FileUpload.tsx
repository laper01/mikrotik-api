import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Input } from "@/Components/ui/input";
import { Progress } from "@/Components/ui/progress";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";
import Theme from "@/Themes";
import { useAuth } from "@/context/AuthContext";

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const { toast } = useToast();
    const { getToken } = useAuth();
    const token = getToken();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        // console.log('file');
        // console.log(file);
        if (!file) {
            console.log(file);
            toast({
                title: "File belum dipilih",
                description: "Silahkan memilih file",
            });
            return;
        }

        const formData = new FormData();
        formData.append("excel", file);

        try {
            const response = await axios.post("/api/import", formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    if (total) {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    }
                },
            });

            toast({
                title: "File berhasil di upload",
                description: response.data.message,
            });
            setUploadProgress(0);
            setFile(null);
        } catch (error: any) {
            toast({
                title: "Terjadi kesalahan",
                description:
                    error.response?.data?.message || "An error occurred.",
            });
            setUploadProgress(0);
        }
    };

    return (
        <Theme title="Import user excel">
            <div className="">
                <Input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <Button onClick={handleUpload} className="mb-4" >Upload</Button>
                {uploadProgress > 0 && (
                    <Progress value={uploadProgress} className="mb-4" />
                )}
            </div>
        </Theme>
    );
};

export default FileUpload;
