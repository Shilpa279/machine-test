import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../store/countriesSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

const HomePage = () => {
    const dispatch = useDispatch();
    const { countries, status, error } = useSelector((state) => state.countries);
    const [visibleCountries, setVisibleCountries] = useState(10);
    const [filterRegion, setFilterRegion] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    const handleLoadMore = () => {
        setVisibleCountries((prevCount) => prevCount + 10);
    };

    const filteredCountries = countries.filter((country) => {
        if (filterRegion === "All") return true;
        return country.region === filterRegion;
    });

    if (status === "loading") return <div>Loading...</div>;
    if (status === "failed") return <div>Error: {error}</div>;

    return (
        <div>
            {/* HEADER */}
            <Container className="my-4">
                <header className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
                    <h5 className="fw-bold">Countries</h5>
                    <nav>
                        <Button
                            variant="link"
                            className="text-dark me-2"
                            onClick={() => setFilterRegion("All")}
                        >
                            All
                        </Button>
                        <Button
                            variant="link"
                            className="text-dark me-2"
                            onClick={() => setFilterRegion("Asia")}
                        >
                            Asia
                        </Button>
                        <Button
                            variant="link"
                            className="text-dark me-2"
                            onClick={() => setFilterRegion("Europe")}
                        >
                            Europe
                        </Button>
                    </nav>
                </header>
            </Container>

            {/* MAIN CONTENT */}
            <Container className="my-4">
                <h2 className="text-center mb-4 fw-bold">WELCOME</h2>

                {/* Slider + Side Panel */}
                <Row className="mb-5">
                    {/* SLIDER */}
                    <Col md={8}>
                        <Carousel interval={2000} indicators={true} controls={true}>
                            {filteredCountries.slice(0, 5).map((country) => (
                                <Carousel.Item key={country.name}>
                                    <div
                                        className="d-flex justify-content-center align-items-center bg-light border"
                                        style={{ height: "250px", cursor: "pointer" }}
                                        onClick={() => setSelectedCountry(country)} // click to update side panel
                                    >
                                        <img
                                            src={country.flags?.png || country.flag}
                                            alt={`${country.name} Flag`}
                                            style={{ maxHeight: "200px", objectFit: "contain" }}
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>

                    {/* SIDE PANEL */}
                    <Col md={4}>
                        <div
                            className="bg-light border d-flex flex-column justify-content-center align-items-center p-3"
                            style={{ height: "250px" }}
                        >
                            {selectedCountry ? (
                                <>
                                    <img
                                        src={selectedCountry.flags?.png || selectedCountry.flag}
                                        alt={`${selectedCountry.name} Flag`}
                                        style={{ maxWidth: "120px", maxHeight: "80px", objectFit: "contain" }}
                                    />
                                    <h6 className="mt-3">{selectedCountry.name}</h6>
                                    <p className="text-muted small">{selectedCountry.region}</p>
                                </>
                            ) : (
                                <span>Select a country from slider</span>
                            )}
                        </div>
                    </Col>
                </Row>


                {/* COUNTRY GRID */}
                <Row>
                    {filteredCountries.slice(0, visibleCountries).map((country) => (
                        <Col xs={12} sm={6} className="mb-4" key={country.name}>
                            <Card className="h-100 border p-2 d-flex flex-row align-items-center">
                                <div style={{ width: "60px", height: "40px", overflow: "hidden" }}>
                                    <img
                                        src={country.flags?.png || country.flag}   // handles both API formats
                                        alt={`${country.name} Flag`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                                <div className="ms-3">
                                    <Card.Title className="mb-1">{country.name}</Card.Title>
                                    <Card.Text className="text-muted small">{country.region}</Card.Text>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* LOAD MORE */}
                {visibleCountries < filteredCountries.length && (
                    <div className="text-center mt-3">
                        <Button variant="dark" onClick={handleLoadMore}>
                            Load More
                        </Button>
                    </div>
                )}
            </Container>

            {/* FOOTER */}
            <footer className="text-center py-4 border-top">
                <div className="mb-4">
                    <i className="bi bi-facebook me-3 fs-5"></i>
                    <i className="bi bi-twitter me-3 fs-5"></i>
                    <i className="bi bi-linkedin me-3 fs-5"></i>
                    <i className="bi bi-youtube fs-5"></i>
                </div>
                <p
                    style={{
                        fontFamily: "Noto Sans, sans-serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: "13px",
                        lineHeight: "19px",
                        letterSpacing: "0.03em",
                        textAlign: "center"
                    }}
                    className="mb-[15px]"
                >
                    Example@email.com
                </p>

                {/* <small>Copyright © 2020 Name. All rights reserved.</small> */}
                <small
                    style={{
                        fontFamily: "Noto Sans, sans-serif",
                        fontWeight: 700,
                        fontStyle: "normal",
                        fontSize: "13px",
                        lineHeight: "19px",
                        letterSpacing: "0.03em",
                        textAlign: "center",
                        display: "block"
                    }}
                >
                    Copyright © 2020 Name. All rights reserved.
                </small>

            </footer>
        </div>
    );
};

export default HomePage;
