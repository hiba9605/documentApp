
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Typography, Container, Box, CircularProgress, Paper } from "@mui/material";

const ViewDoc = () => {
  const { id } = useParams();
  const [docData, setDocData] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "documents", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocData(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #89CFF0, #FFB6C1)",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 3,
      }}
    >
      <Container maxWidth="md">
        {docData ? (
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: "15px",
              backgroundColor: "#FDF5E6",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                textAlign: "center",
                fontWeight: "bold",
                color: "#2C3E50",
              }}
            >
              {docData.title}
            </Typography>
            <Box
              sx={{
                fontSize: "1.1rem",
                lineHeight: "1.6",
                color: "#333",
                backgroundColor: "#fff",
                borderRadius: "10px",
                p: 3,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
              }}
              dangerouslySetInnerHTML={{ __html: docData.content }}
            />
          </Paper>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress sx={{ color: "#FF6347" }} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ViewDoc;
